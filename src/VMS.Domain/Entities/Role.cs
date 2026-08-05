// VMS.Domain/Entities/Role.cs
namespace VMS.Domain.Entities;

public class Role : Common.BaseEntity
{
    public string Name { get; set; } = default!;   // "Admin", "Volunteer", "EventCoordinator"
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}

public class UserRole
{
    public Guid UserId { get; set; }
    public User User { get; set; } = default!;
    public Guid RoleId { get; set; }
    public Role Role { get; set; } = default!;
}