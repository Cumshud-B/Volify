// VMS.Application/DTOs/AI/*.cs
namespace VMS.Application.DTOs.AI;


public record CertificateGenerationRequestDto(
    Guid VolunteerActivityId, string VolunteerFirstName, string EventTitle,
    int HoursLogged, string RoleDescription);

