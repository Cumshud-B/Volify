// VMS.Application/Features/Auth/Commands/ForgotPassword/ForgotPasswordCommand.cs
public sealed record ForgotPasswordCommand(string Email) : IRequest<Unit>;