using Microsoft.Data.SqlClient;
using System.Data;

namespace MaxTrax3_API.Data
{
    public class SqlServerAdapter : IDbAdapter
    {
        private readonly IConfiguration _cfg;
        public SqlServerAdapter(IConfiguration cfg) => _cfg = cfg;

        public async Task<IDbConnection> OpenMainAsync()
        {
            var conn = new SqlConnection(_cfg.GetConnectionString("MainDb"));
            await conn.OpenAsync();
            return conn;
        }

        public async Task<IDbConnection> OpenClientAsync(string? clientKey = null)
        {
            // In a fuller impl, clientKey would pick a conn string from Control.Source
            var conn = new SqlConnection(_cfg.GetConnectionString("ClientDb"));
            await conn.OpenAsync();
            return conn;
        }
    }
}