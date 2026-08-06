namespace VMS.Application.DTOs.Auth;

public record RegisterRequestDto(
    string FirstName, string LastName, string Email, string Password,
    string? PhoneNumber, List<string>? Skills, List<string>? Interests);