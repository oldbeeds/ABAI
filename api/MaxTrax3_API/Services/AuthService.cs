using Dapper;
using BCrypt.Net;
using MaxTrax3_API.Data;
using MaxTrax3_API.Models;

namespace MaxTrax3_API.Services
{
    public class AuthService
    {
        private readonly IDbAdapter _db;
        public AuthService(IDbAdapter db) => _db = db;

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            using var conn = await _db.OpenMainAsync();
            return await conn.QuerySingleOrDefaultAsync<User>(
                "SELECT UserId, Email, PasswordHash, IsActive FROM dbo.Users WHERE Email = @Email",
                new { Email = email });
        }

        public bool VerifyPassword(string password, string hash) => BCrypt.Net.BCrypt.Verify(password, hash);
    }
}