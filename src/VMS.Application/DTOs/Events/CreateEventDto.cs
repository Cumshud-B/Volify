// VMS.Application/DTOs/Events/*.cs
namespace VMS.Application.DTOs.Events;
public record CreateEventDto(
    string Title, string Description, string Location,
    DateTime StartDateUtc, DateTime EndDateUtc, int Capacity,
    int XpReward, List<string> CategoryTags);