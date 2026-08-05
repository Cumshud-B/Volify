// VMS.Application/Common/Interfaces/IJwtTokenService.cs
using System.Security.Claims;

namespace VMS.Application.Common.Interfaces;

public interface IJwtTokenService
{
    string GenerateAccessToken(Guid userId, string email, IEnumerable<string> roles);
    string GenerateRefreshToken();
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}