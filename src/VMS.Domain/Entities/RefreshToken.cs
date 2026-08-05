namespace VMS.Domain.Entities;

using VMS.Domain.Entities;

public class RefreshToken : Common.BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
    public string Token { get; set; } = default!;
    public DateTime ExpiresAtUtc { get; set; }
    public bool IsRevoked { get; set; }
}