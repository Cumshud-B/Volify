// VMS.Application/Features/Auth/Commands/Register/RegisterCommandValidator.cs
using FluentValidation;

namespace VMS.Application.Features.Auth.Commands.Register;

public sealed class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);
        RuleFor(x => x.Password)
            .NotEmpty().MinimumLength(8)
            .Matches("[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches("[0-9]").WithMessage("Password must contain at least one digit.");
        RuleFor(x => x.PhoneNumber)
            .Matches(@"^\+?[0-9\s-]{7,15}$").When(x => !string.IsNullOrWhiteSpace(x.PhoneNumber));
    }
}