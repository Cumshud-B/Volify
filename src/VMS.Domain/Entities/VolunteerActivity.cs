// VMS.Domain/Entities/VolunteerActivity.cs
using VMS.Solution.src.VMS.Domain.Enums;

namespace VMS.Domain.Entities;

// Join entity: a volunteer's registration/participation in an event
public class VolunteerActivity : Common.BaseEntity
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;

    public Guid EventId { get; set; }
    public Event Event { get; set; } = default!;

    public ApprovalStatus RegistrationStatus { get; set; } = ApprovalStatus.Pending;
    public bool AttendanceConfirmed { get; set; } = false;
    public DateTime? CheckedInAtUtc { get; set; }
    public int HoursLogged { get; set; }
    public int XpAwarded { get; set; }
    public string? CertificateUrl { get; set; }
    public string? AiFeedbackSummary { get; set; }   // AI-generated appreciation text
}