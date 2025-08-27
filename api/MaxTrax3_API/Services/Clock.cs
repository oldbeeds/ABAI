namespace MaxTrax3_API.Services
{
    public interface IClock { DateTime UtcNow { get; } }
    public class SystemClock : IClock { public DateTime UtcNow => DateTime.UtcNow; }
}