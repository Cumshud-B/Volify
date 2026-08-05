// VMS.Domain/Entities/User.cs
namespace VMS.Domain.Entities;

public class User : Common.BaseEntity
{
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public string? PhoneNumber { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? Bio { get; set; }
    public string? SkillsCsv { get; set; }          // e.g. "logistics,firstaid,photography"
    public string? InterestsCsv { get; set; }
    public bool IsEmailVerified { get; set; }
    public ApprovalStatus ApprovalStatus { get; set; } = ApprovalStatus.Pending;
    public int TotalXp { get; set; } = 0;

    // Navigation
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<VolunteerActivity> Activities { get; set; } = new List<VolunteerActivity>();
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
    public LeaderboardEntry? LeaderboardEntry { get; set; }
}