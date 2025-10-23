using CollectionManager.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManager.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult GetMessage()
        {
            return Ok(new { message = "Hola desde la API de ASP.NET Core!" });
        }

        [HttpGet("jerseys", Name = "list")]
        public IEnumerable<Jersey> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Jersey
            {
                Id = index,
                Team = $"Team {index}",
                League = $"League {index}",
                IsFlocked = index % 2 == 0,
                JerseyName = $"Player {index}",
                JerseyNumber = index * 10
            })
            .ToArray();
        }

        [HttpPost(Name = "New Entry")]
        public IActionResult Post([FromBody] Jersey jersey)
        {
            if (jersey == null)
            {
                return BadRequest();
            }
            // Here you would typically add the jersey to a database
            _logger.LogInformation($"Received new jersey. Team: {jersey.Team}");
            return CreatedAtAction(nameof(Get), new { id = jersey.Id }, jersey);
        }
    }
}
