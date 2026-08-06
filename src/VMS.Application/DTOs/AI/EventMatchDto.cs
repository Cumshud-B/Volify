namespace VMS.Application.DTOs.AI;

public record EventMatchDto(Guid EventId, double MatchScore, string Reason);