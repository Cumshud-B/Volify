// VMS.Persistence/Seed/DbSeeder.cs
using Microsoft.AspNetCore.Identity;
using VMS.Domain.Entities;
using VMS.Domain.Enums;
using VMS.Solution.src.VMS.Persistence.Context;

namespace VMS.Persistence.Seed;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context, IPasswordHasher hasher)
    {
        if (!context.Roles.Any())
        {
            context.Roles.AddRange(
                new Role { Name = "Admin" },
                new Role { Name = "EventCoordinator" },
                new Role { Name = "Volunteer" });
            await context.SaveChangesAsync();
        }

        if (!context.Users.Any(u => u.Email == "admin@univolunteer.az"))
        {
            var adminRole = context.Roles.Single(r => r.Name == "Admin");

            var admin = new User
            {
                FirstName = "System",
                LastName = "Administrator",
                Email = "admin@univolunteer.az",
                PasswordHash = hasher.Hash("ChangeMe!2026"),
                IsEmailVerified = true,
                ApprovalStatus = ApprovalStatus.Approved,
                TotalXp = 0
            };
            admin.UserRoles.Add(new UserRole { Role = adminRole });
            context.Users.Add(admin);
            await context.SaveChangesAsync();
        }

        if (!context.Badges.Any())
        {
            context.Badges.AddRange(
                new Badge { Name = "First Steps", IconUrl = "/badges/first-steps.svg", Criteria = "1_EVENT_COMPLETED" },
                new Badge { Name = "Community Pillar", IconUrl = "/badges/pillar.svg", Criteria = "10_EVENTS_COMPLETED" },
                new Badge { Name = "100 Hour Club", IconUrl = "/badges/100h.svg", Criteria = "100_HOURS_LOGGED" });
            await context.SaveChangesAsync();
        }

        if (!context.Events.Any())
        {
            var coordinator = context.Users.First();
            context.Events.AddRange(
                new Event
                {
                    Title = "University Blood Donation Drive",
                    Description = "Support the campus blood donation initiative with the local Red Crescent chapter.",
                    Location = "Main Campus Hall, Baku",
                    StartDateUtc = DateTime.UtcNow.AddDays(14),
                    EndDateUtc = DateTime.UtcNow.AddDays(14).AddHours(6),
                    Capacity = 40,
                    XpReward = 60,
                    CategoryTagsCsv = "health,community",
                    Status = EventStatus.Published,
                    CreatedByUserId = coordinator.Id,
                    QrCodeToken = Guid.NewGuid().ToString("N")
                },
                new Event
                {
                    Title = "River Cleanup Initiative",
                    Description = "A hands-on environmental cleanup along the Kura riverbank.",
                    Location = "Kura Riverbank, Baku",
                    StartDateUtc = DateTime.UtcNow.AddDays(21),
                    EndDateUtc = DateTime.UtcNow.AddDays(21).AddHours(4),
                    Capacity = 60,
                    XpReward = 45,
                    CategoryTagsCsv = "environment,outdoors",
                    Status = EventStatus.Published,
                    CreatedByUserId = coordinator.Id,
                    QrCodeToken = Guid.NewGuid().ToString("N")
                });
            await context.SaveChangesAsync();
        }
    }
}