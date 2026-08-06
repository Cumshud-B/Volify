namespace VMS.Application.DTOs.Auth;
public record UserSummaryDto(Guid Id, string FirstName, string LastName, string Email,
    List<string> Roles, int TotalXp, string? ProfileImageUrl);