namespace VMS.Application.DTOs.Events;

public record EventDetailDto(
    Guid Id, string Title, string Description, string Location,
    DateTime StartDateUtc, DateTime EndDateUtc, int Capacity, int XpReward,
    List<string> CategoryTags, string Status, List<VolunteerRegistrationDto> Registrations);