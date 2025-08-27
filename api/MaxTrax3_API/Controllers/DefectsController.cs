using Microsoft.AspNetCore.Mvc;
using MaxTrax3_API.Services;

namespace MaxTrax3_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DefectsController : ControllerBase
    {
        private readonly DefectsService _svc;
        public DefectsController(DefectsService svc) { _svc = svc; }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _svc.ListAsync());

        [HttpGet("counts")]
        public async Task<IActionResult> Counts() => Ok(await _svc.CountsAsync());
    }
}