using CollectionManager.Server.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CollectionManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InformationLogsController : Controller
    {
        private readonly IInformationLogService _logService;
        public InformationLogsController(IInformationLogService logService)
        {
            _logService = logService;
        }
        [HttpGet("")]
        public async Task<IActionResult> RetrieveGeneralSearchLogs()
        {
            var result = await _logService.GetSearchLogs();
            if(result == null || result.Count == 0)
            {
                return NotFound("No logs found.");
            }
            return Ok(result);
        }
    }
}
