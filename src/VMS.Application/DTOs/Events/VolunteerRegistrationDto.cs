namespace VMS.Application.DTOs.Events;

public record VolunteerRegistrationDto(
    Guid UserId, string FullName, string RegistrationStatus,
    bool AttendanceConfirmed, int HoursLogged);