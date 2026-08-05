// VMS.Application/Features/Auth/Commands/RefreshToken/RefreshTokenCommand.cs
public sealed record RefreshTokenCommand(string RefreshToken) : IRequest<RefreshTokenResultDto>;

public sealed record RefreshTokenResultDto(string AccessToken, string RefreshToken);