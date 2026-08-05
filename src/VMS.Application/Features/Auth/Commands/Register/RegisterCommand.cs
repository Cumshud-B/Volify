// VMS.Application/Features/Auth/Commands/Register/RegisterCommand.cs
public sealed record RegisterCommand(
    string FirstName, string LastName, string Email, string Password,
    string? PhoneNumber, List<string>? Skills, List<string>? Interests) : IRequest<RegisterResultDto>;

public sealed record RegisterResultDto(Guid UserId, string Email);