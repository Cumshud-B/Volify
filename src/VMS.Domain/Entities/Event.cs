// VMS.Domain/Entities/Event.cs
using VMS.Domain.Enums;
using VMS.Solution.src.VMS.Domain.Entities;

namespace VMS.Domain.Entities;

public class Event : Common.BaseEntity
{
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Location { get; set; } = default!;
    public DateTime StartDateUtc { get; set; }
    public DateTime EndDateUtc { get; set; }
    public int Capacity { get; set; }
    public int XpReward { get; set; } = 50;
    public string CategoryTagsCsv { get; set; } = string.Empty; // "environment,education"
    public EventStatus Status { get; set; } = EventStatus.Draft;
    public Guid CreatedByUserId { get; set; }
    public string? QrCodeToken { get; set; }         // unique token embedded in QR

    public ICollection<VolunteerActivity> Activities { get; set; } = new List<VolunteerActivity>();
}