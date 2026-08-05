// VMS.Application/Features/Auth/Commands/ForgotPassword/ResetPasswordCommand.cs
// (paired with ForgotPassword since it completes the same flow)
public sealed record ResetPasswordCommand(string Email, string OtpCode, string NewPassword) : IRequest<Unit>;

public sealed class ResetPasswordCommandHandler(IApplicationDbContext db, IPasswordHasher hasher)
    : IRequestHandler<ResetPasswordCommand, Unit>
{
    public async Task<Unit> Handle(ResetPasswordCommand request, CancellationToken ct)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email, ct)
            ?? throw new UnauthorizedAccessException("Invalid reset request.");

        var hashedInput = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(request.OtpCode)));

        if (user.PasswordResetOtpHash != hashedInput || user.PasswordResetOtpExpiresAtUtc < DateTime.UtcNow)
            throw new UnauthorizedAccessException("Invalid or expired OTP.");

        user.PasswordHash = hasher.Hash(request.NewPassword);
        user.PasswordResetOtpHash = null;
        user.PasswordResetOtpExpiresAtUtc = null;

        await db.SaveChangesAsync(ct);
        return Unit.Value;
    }
}