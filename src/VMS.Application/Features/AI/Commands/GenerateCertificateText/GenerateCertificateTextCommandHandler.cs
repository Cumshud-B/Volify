// VMS.Application/Features/AI/Commands/GenerateCertificateText/GenerateCertificateTextCommandHandler.cs
using MediatR;
using VMS.Application.Common.Interfaces;
using VMS.Solution.src.VMS.Application.Common.Interfaces;
using VMS.Solution.src.VMS.Application.DTOs.AI;

public sealed class GenerateCertificateTextCommandHandler(
    IApplicationDbContext db, IAiRecommendationService ai)
    : IRequestHandler<GenerateCertificateTextCommand, CertificateGenerationResultDto>
{
    public async Task<CertificateGenerationResultDto> Handle(
        GenerateCertificateTextCommand request, CancellationToken ct)
    {
        var activity = await db.VolunteerActivities
            .Include(a => a.User)
            .Include(a => a.Event)
            .FirstOrDefaultAsync(a => a.Id == request.VolunteerActivityId, ct)
            ?? throw new KeyNotFoundException("Volunteer activity not found.");

        if (!activity.AttendanceConfirmed)
            throw new InvalidOperationException("Cannot generate a certificate before attendance is confirmed.");

        var appreciationText = await ai.GenerateCertificateAppreciationAsync(
            activity.User.FirstName, activity.Event.Title, activity.HoursLogged,
            "Volunteer", ct);

        activity.AiFeedbackSummary = appreciationText;
        // Actual PDF/certificate rendering would happen in a separate ICertificateRenderer
        // service (not shown yet) that produces activity.CertificateUrl.

        await db.SaveChangesAsync(ct);

        return new CertificateGenerationResultDto(appreciationText, activity.CertificateUrl ?? string.Empty);
    }
}