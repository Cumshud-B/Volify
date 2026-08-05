namespace VMS.Domain.Entities;

using VMS.Solution.src.VMS.Domain.Enums;

public class AuditLog : Common.BaseEntity
{
    public Guid? ActorUserId { get; set; }
    public AuditAction Action { get; set; }
    public string EntityName { get; set; } = default!;
    public string EntityId { get; set; } = default!;
    public string? ChangesJson { get; set; }
    public string? IpAddress { get; set; }
}