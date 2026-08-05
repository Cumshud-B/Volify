// VMS.Application/Common/Interfaces/IAiRecommendationService.cs
using VMS.Solution.src.VMS.Application.DTOs.AI;
using VMS.Solution.src.VMS.Application.DTOs.Events;

namespace VMS.Application.Common.Interfaces;

public interface IAiRecommendationService
{
    Task<IReadOnlyList<EventMatchDto>> GetMatchingEventsAsync(
        string skillsCsv, string interestsCsv, IEnumerable<EventSummaryDto> candidateEvents,
        CancellationToken ct = default);

    Task<string> GenerateCertificateAppreciationAsync(
        string volunteerFirstName, string eventTitle, int hoursLogged, string roleDescription,
        CancellationToken ct = default);
}