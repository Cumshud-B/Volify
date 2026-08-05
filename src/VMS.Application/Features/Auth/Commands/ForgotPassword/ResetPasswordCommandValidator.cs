// VMS.Application/Features/Auth/Commands/ForgotPassword/ResetPasswordCommandValidator.cs
using FluentValidation;

namespace VMS.Application.Features.Auth.Commands.ForgotPassword;

public sealed class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();

        RuleFor(x => x.OtpCode)
            .NotEmpty()
            .Length(6)
            .Matches("^[0-9]{6}$")
            .WithMessage("OTP must be a 6-digit numeric code.");

        RuleFor(x => x.NewPassword)
            .NotEmpty()
            .MinimumLength(8)
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches("[0-9]").WithMessage("Password must contain at least one digit.");
    }
}