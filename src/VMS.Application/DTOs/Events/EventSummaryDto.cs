namespace VMS.Application.DTOs.Events;


public record EventSummaryDto(
    Guid Id, string Title, string Location, DateTime StartDateUtc,
    int Capacity, int RegisteredCount, List<string> CategoryTags, string Status);