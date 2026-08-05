// VMS.Application/Features/Auth/Commands/Register/RegisterCommandHandler.cs
public sealed class RegisterCommandHandler(
    IApplicationDbContext db, IPasswordHasher hasher, IEmailService emailService)
    : IRequestHandler<RegisterCommand, RegisterResultDto>
{
    public async Task<RegisterResultDto> Handle(RegisterCommand request, CancellationToken ct)
    {
        var emailExists = await db.Users.AnyAsync(u => u.Email == request.Email, ct);
        if (emailExists)
            throw new InvalidOperationException("An account with this email already exists.");

        var volunteerRole = await db.Roles.FirstOrDefaultAsync(r => r.Name == "Volunteer", ct)
            ?? throw new InvalidOperationException("Default role not configured.");

        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PasswordHash = hasher.Hash(request.Password),
            PhoneNumber = request.PhoneNumber,
            SkillsCsv = request.Skills is { Count: > 0 } ? string.Join(',', request.Skills) : null,
            InterestsCsv = request.Interests is { Count: > 0 } ? string.Join(',', request.Interests) : null,
            IsEmailVerified = false,
            ApprovalStatus = ApprovalStatus.Pending
        };
        user.UserRoles.Add(new UserRole { Role = volunteerRole });

        db.Users.Add(user);
        await db.SaveChangesAsync(ct);

        await emailService.SendWelcomeEmailAsync(user.Email, user.FirstName, ct);

        return new RegisterResultDto(user.Id, user.Email);
    }
}