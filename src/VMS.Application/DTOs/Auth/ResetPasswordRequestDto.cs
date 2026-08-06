namespace VMS.Application.DTOs.Auth;

public record ResetPasswordRequestDto(string Email, string OtpCode, string NewPassword);