// VMS.Application/Features/Auth/Commands/RefreshToken/RefreshTokenCommandHandler.cs
using VMS.Domain.Entities;
using VMS.Solution.src.VMS.Application.Common.Interfaces;

public sealed class RefreshTokenCommandHandler(IApplicationDbContext db, IJwtTokenService jwt)
    : IRequestHandler<RefreshTokenCommand, RefreshTokenResultDto>
{
    public async Task<RefreshTokenResultDto> Handle(RefreshTokenCommand request, CancellationToken ct)
    {
        var stored = await db.RefreshTokens
            .Include(rt => rt.User).ThenInclude(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(rt => rt.Token == request.RefreshToken, ct);

        if (stored is null || stored.IsRevoked || stored.ExpiresAtUtc < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired refresh token.");

        // Rotation: revoke the used token, issue a brand new pair
        stored.IsRevoked = true;

        var roles = stored.User.UserRoles.Select(ur => ur.Role.Name);
        var newAccessToken = jwt.GenerateAccessToken(stored.UserId, stored.User.Email, roles);
        var newRefreshToken = jwt.GenerateRefreshToken();

        db.RefreshTokens.Add(new RefreshToken
        {
            UserId = stored.UserId,
            Token = newRefreshToken,
            ExpiresAtUtc = DateTime.UtcNow.AddDays(7)
        });

        await db.SaveChangesAsync(ct);

        return new RefreshTokenResultDto(newAccessToken, newRefreshToken);
    }
}