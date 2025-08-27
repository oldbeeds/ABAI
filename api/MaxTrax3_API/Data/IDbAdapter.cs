using System.Data;

namespace MaxTrax3_API.Data
{
    public interface IDbAdapter
    {
        Task<IDbConnection> OpenMainAsync();
        Task<IDbConnection> OpenClientAsync(string? clientKey = null);
    }
}