// VMS.Application/DTOs/Auth/*.cs
namespace VMS.Application.DTOs.Auth;
public record AuthResultDto(string AccessToken, string RefreshToken, UserSummaryDto User);