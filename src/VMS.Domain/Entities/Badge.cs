namespace VMS.Domain.Entities;

using VMS.Solution.src.VMS.Domain.Entities;

public class Badge : Common.BaseEntity
{
    public string Name { get; set; } = default!;
    public string IconUrl { get; set; } = default!;
    public string Criteria { get; set; } = default!; // e.g. "10_EVENTS_COMPLETED"
    public ICollection<UserBadge> UserBadges { get; set; } = new List<UserBadge>();
}