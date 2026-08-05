namespace VMS.Domain.Entities;

public class LeaderboardEntry : Common.BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
    public int Xp { get; set; }
    public int Rank { get; set; }
    public int EventsCompleted { get; set; }
    public int TotalHours { get; set; }
}