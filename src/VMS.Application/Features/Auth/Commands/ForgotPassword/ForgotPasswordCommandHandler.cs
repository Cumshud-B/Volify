// VMS.Application/Features/Auth/Commands/ForgotPassword/ForgotPasswordCommandHandler.cs
using System.Security.Cryptography;
using System.Text;
using VMS.Solution.src.VMS.Application.Common.Interfaces;

public sealed class ForgotPasswordCommandHandler(IApplicationDbContext db, IEmailService emailService)
    : IRequestHandler<ForgotPasswordCommand, Unit>
{
    public async Task<Unit> Handle(ForgotPasswordCommand request, CancellationToken ct)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == request.Email, ct);

        // Always return success even if user not found — avoids leaking which emails are registered
        if (user is null) return Unit.Value;

        var otp = Random.Shared.Next(100000, 999999).ToString();
        user.PasswordResetOtpHash = HashOtp(otp);           // add these two fields to User entity
        user.PasswordResetOtpExpiresAtUtc = DateTime.UtcNow.AddMinutes(10);

        await db.SaveChangesAsync(ct);
        await emailService.SendOtpEmailAsync(user.Email, otp, ct);

        return Unit.Value;
    }

    private static string HashOtp(string otp) =>
        Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(otp)));
}