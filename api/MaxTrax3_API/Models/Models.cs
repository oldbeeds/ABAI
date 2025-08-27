namespace MaxTrax3_API.Models
{
    public record User(int UserId, string Email, string PasswordHash, bool IsActive);
    public record Defect(int Defect_Id, string Status, string Priority, string Problem, DateOnly Date, double? Lat, double? Lng);
}