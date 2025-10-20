const express = require("express");
const { chromium } = require("playwright");
const pino = require("pino");
const pretty = require("pino-pretty");
const log = pino(pretty());

require("dotenv").config();

log.info("Playwright microservice");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const API_KEY = process.env.PLAYWRIGHT_API_KEY || ""; // protege el endpoint

let browser; // reuse browser
let launching = false;
const MAX_CONCURRENT = 2;
let currentConcurrent = 0;

async function ensureBrowser() {
  if (browser) return browser;
  if (launching) {
    // wait until ready
    while (!browser) await new Promise((r) => setTimeout(r, 200));
    return browser;
  }
  launching = true;
  browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  launching = false;
  return browser;
}

app.get("/search", async (req, res) => {
  try {
    // Simple auth between your .NET and this service
    const key = req.get("x-service-key") || "";
    if (!API_KEY || key !== API_KEY) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const query = (req.query.query || "").trim();
    if (!query) return res.status(400).json({ error: "query required" });

    // limit concurrency
    if (currentConcurrent >= MAX_CONCURRENT) {
      return res.status(429).json({ error: "Too many requests, try later" });
    }

    currentConcurrent++;
    const per_page = parseInt(req.query.per_page) || 10;
    const pageNum = parseInt(req.query.page) || 1;

    const br = await ensureBrowser();
    const browser = await chromium.launch({
      headless: false, // importante: modo visible
      devtools: true, // abre devtools automáticamente (opcional)
      slowMo: 200, // ralentiza acciones para que veas lo que pasa (ms)
      args: ["--no-sandbox"],
    });

    const context = await browser.newContext({
      viewport: { width: 1280, height: 900 },
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...",
    });

    const page = await context.newPage();

    const catalogUrl = `https://www.vinted.de/catalog?search_text=${encodeURIComponent(
      query
    )}&size_ids[]=209`;
    await page.goto(catalogUrl, { waitUntil: "networkidle" });

    const pageApi = await context.newPage();

    const apiUrl = `https://www.vinted.de/api/v2/catalog/items?search_text=${encodeURIComponent(
      query
    )}&size_ids[]=209&per_page=500`;

    await pageApi.goto(apiUrl, { waitUntil: "networkidle" });

    console.log("URL que voy a usar:", apiUrl);

    // await pageApi.pause();

    const [response] = await Promise.all([
      pageApi.waitForResponse(
        (resp) => resp.url() === apiUrl && resp.status() === 200
      ),
      pageApi.goto(apiUrl), // navega a la página JSON
    ]);

    const data = await response.json();
    // Clean up context to release cookies/memory
    await context.close();
    currentConcurrent--;

    console.log(data);
    return res.json({ ok: true, data });
  } catch (err) {
    currentConcurrent = Math.max(0, currentConcurrent - 1);
    log.error(err);
    if (err && err.status) {
      return res
        .status(err.status)
        .json({ error: "Upstream error", detail: err.body || null });
    }
    return res.status(500).json({ error: "internal_error" });
  }
});

app.listen(PORT, () => {
  log.info(`Playwright service listening on port ${PORT}`);
});

// graceful shutdown
process.on("SIGINT", async () => {
  log.info("Shutting down...");
  if (browser) await browser.close();
  process.exit();
});
