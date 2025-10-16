using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System.Net.Http;
using System.Text.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CollectionManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VintedProxyController : ControllerBase
    {
        private readonly IMemoryCache _memoryCache;
        private readonly IHttpClientFactory _httpClient;
        private readonly IConfiguration _configuration;
        private readonly string _playwrightUrl;
        private readonly string _playwrightKey;
        public VintedProxyController(IMemoryCache memoryCache, IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _memoryCache = memoryCache;
            _configuration = configuration;
            _playwrightUrl = _configuration.GetValue<string>("Playwright:Url") ?? "http://localhost:4000";
            _playwrightKey = _configuration.GetValue<string>("Playwright:ApiKey") ?? "mi-secret-key-123";
            _httpClient = httpClientFactory;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] int per_page = 10)
        {
            if (string.IsNullOrWhiteSpace(query)) return BadRequest("query required");

            var cacheKey = $"vinted:{query}:{per_page}";
            if (_memoryCache.TryGetValue(cacheKey, out object cached)) return Ok(cached);

            var client = _httpClient.CreateClient();
            var url = $"{_playwrightUrl}/search?query={Uri.EscapeDataString(query)}&per_page={per_page}";

            var req = new HttpRequestMessage(HttpMethod.Get, url);
            if (!string.IsNullOrEmpty(_playwrightKey)) req.Headers.Add("x-service-key", _playwrightKey);

            var resp = await client.SendAsync(req);
            var body = await resp.Content.ReadAsStringAsync();

            if (!resp.IsSuccessStatusCode)
            {
                return StatusCode((int)resp.StatusCode, body);
            }

            // retornamos tal cual la estructura del microservicio
            var json = JsonDocument.Parse(body).RootElement;

            // opcional: extraer data.items y mapear a modelos si quieres
            var result = json.GetProperty("data").ToString();

            // cache corto
            _memoryCache.Set(cacheKey, JsonDocument.Parse(result).RootElement, TimeSpan.FromSeconds(15));

            return Content(result, "application/json");
        }

        // GET: api/<ValuesController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ValuesController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
