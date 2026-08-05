namespace VMS.Domain.Entities;

using VMS.Domain.Entities;

public class UserBadge
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
    public Guid BadgeId { get; set; }
    public Badge Badge { get; set; } = default!;
    public DateTime EarnedAtUtc { get; set; } = DateTime.UtcNow;
}