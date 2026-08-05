// VMS.Application/Features/Auth/Commands/RefreshToken/RefreshTokenCommand.cs
using MediatR;

public sealed record RefreshTokenCommand(string RefreshToken) : IRequest<RefreshTokenResultDto>;

public sealed record RefreshTokenResultDto(string AccessToken, string RefreshToken);