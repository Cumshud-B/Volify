// VMS.API/Controllers/AuthController.cs
using MediatR;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using VMS.Solution.src.VMS.Application.Features.Auth.Commands.Login;

namespace VMS.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class AuthController(ISender mediator) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command)
    {
        var result = await mediator.Send(command);
        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var result = await mediator.Send(command);
        SetRefreshTokenCookie(result.RefreshToken);
        return Ok(new { accessToken = result.AccessToken, user = result.User });
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"]
            ?? throw new UnauthorizedAccessException("Refresh token missing.");

        var result = await mediator.Send(new RefreshTokenCommand(refreshToken));
        SetRefreshTokenCookie(result.RefreshToken);
        return Ok(new { accessToken = result.AccessToken });
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordCommand command)
    {
        await mediator.Send(command); // sends OTP via email
        return Ok(new { message = "If the email exists, an OTP has been sent." });
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
    {
        await mediator.Send(command);
        return Ok(new { message = "Password reset successfully." });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("refreshToken");
        return NoContent();
    }

    private void SetRefreshTokenCookie(string token) =>
        Response.Cookies.Append("refreshToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTimeOffset.UtcNow.AddDays(7)
        });
}