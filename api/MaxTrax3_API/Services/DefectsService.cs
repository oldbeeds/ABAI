using Dapper;
using MaxTrax3_API.Data;
using MaxTrax3_API.Models;

namespace MaxTrax3_API.Services
{
    public class DefectsService
    {
        private readonly IDbAdapter _db;
        public DefectsService(IDbAdapter db) => _db = db;

        public async Task<IEnumerable<Defect>> ListAsync()
        {
            using var conn = await _db.OpenClientAsync();
            var sql = @"SELECT defect_id as Defect_Id, status, priority, problem, CAST([date] AS date) as [Date], lat, lng
                        FROM dbo.Defects ORDER BY [date] DESC";
            return await conn.QueryAsync<Defect>(sql);
        }

        public async Task<object> CountsAsync()
        {
            using var conn = await _db.OpenClientAsync();
            var total = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM dbo.Defects");
            var withGeo = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM dbo.Defects WHERE lat IS NOT NULL AND lng IS NOT NULL");
            return new { total, withGeo };
        }
    }
}