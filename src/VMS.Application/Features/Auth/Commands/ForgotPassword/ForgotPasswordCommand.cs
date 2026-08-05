// VMS.Application/Features/Auth/Commands/ForgotPassword/ForgotPasswordCommand.cs
using MediatR;

public sealed record ForgotPasswordCommand(string Email) : IRequest<Unit>;