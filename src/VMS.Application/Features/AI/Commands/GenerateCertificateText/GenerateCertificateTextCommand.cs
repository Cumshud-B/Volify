// VMS.Application/Features/AI/Commands/GenerateCertificateText/GenerateCertificateTextCommand.cs
using VMS.Solution.src.VMS.Application.DTOs.AI;

public sealed record GenerateCertificateTextCommand(
    Guid VolunteerActivityId) : IRequest<CertificateGenerationResultDto>;