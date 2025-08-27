using Microsoft.AspNetCore.Mvc;
using MaxTrax3_API.Services;

namespace MaxTrax3_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _auth;
        public AuthController(AuthService auth) { _auth = auth; }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest req)
        {
            var user = await _auth.GetUserByEmailAsync(req.Email);
            if (user is null || !_auth.VerifyPassword(req.Password, user.PasswordHash))
                return Unauthorized();

            // For now, return a stub (JWT can be added later)
            return Ok(new { ok = true, email = user.Email });
        }

        public record LoginRequest(string Email, string Password);
    }
}