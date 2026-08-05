// VMS.Infrastructure/AI/OpenAiRecommendationService.cs
using Microsoft.Extensions.Options;
using System.Net.Http.Json;
using System.Text.Json;
using VMS.Application.Common.Interfaces;
using VMS.Solution.src.VMS.Application.DTOs.AI;
using VMS.Solution.src.VMS.Application.DTOs.Events;

namespace VMS.Infrastructure.AI;

public sealed class OpenAiRecommendationService(HttpClient httpClient, IOptions<AiSettings> options)
    : IAiRecommendationService
{
    private readonly AiSettings _settings = options.Value;

    public async Task<IReadOnlyList<EventMatchDto>> GetMatchingEventsAsync(
        string skillsCsv, string interestsCsv, IEnumerable<EventSummaryDto> candidateEvents,
        CancellationToken ct = default)
    {
        var prompt = BuildMatchmakingPrompt(skillsCsv, interestsCsv, candidateEvents);

        var request = new
        {
            model = _settings.Model, // e.g. "gpt-4.1-mini"
            messages = new[]
            {
                new { role = "system", content = "You are a volunteer-matching engine. Respond ONLY with strict JSON: an array of {eventId, matchScore, reason}." },
                new { role = "user", content = prompt }
            },
            temperature = 0.3
        };

        using var httpRequest = new HttpRequestMessage(HttpMethod.Post, "chat/completions")
        {
            Content = JsonContent.Create(request)
        };
        httpRequest.Headers.Add("Authorization", $"Bearer {_settings.ApiKey}");

        var response = await httpClient.SendAsync(httpRequest, ct);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<OpenAiChatResponse>(cancellationToken: ct);
        var rawJson = payload?.Choices.FirstOrDefault()?.Message.Content ?? "[]";
        var cleaned = rawJson.Replace("```json", "").Replace("```", "").Trim();

        return JsonSerializer.Deserialize<List<EventMatchDto>>(cleaned,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? [];
    }

    public async Task<string> GenerateCertificateAppreciationAsync(
        string volunteerFirstName, string eventTitle, int hoursLogged, string roleDescription,
        CancellationToken ct = default)
    {
        var prompt = $"Write a warm, professional 2-sentence appreciation note for a volunteer " +
                     $"named {volunteerFirstName} who contributed {hoursLogged} hours to '{eventTitle}' " +
                     $"as a {roleDescription}. No emojis, no exclamation overload.";

        var request = new
        {
            model = _settings.Model,
            messages = new[]
            {
                new { role = "system", content = "You write concise, sincere volunteer certificate text." },
                new { role = "user", content = prompt }
            },
            temperature = 0.6
        };

        using var httpRequest = new HttpRequestMessage(HttpMethod.Post, "chat/completions")
        {
            Content = JsonContent.Create(request)
        };
        httpRequest.Headers.Add("Authorization", $"Bearer {_settings.ApiKey}");

        var response = await httpClient.SendAsync(httpRequest, ct);
        response.EnsureSuccessStatusCode();

        var payload = await response.Content.ReadFromJsonAsync<OpenAiChatResponse>(cancellationToken: ct);
        return payload?.Choices.FirstOrDefault()?.Message.Content.Trim()
               ?? $"Thank you, {volunteerFirstName}, for your dedication to {eventTitle}.";
    }

    private static string BuildMatchmakingPrompt(string skills, string interests, IEnumerable<EventSummaryDto> events)
    {
        var eventsJson = JsonSerializer.Serialize(events);
        return $"Volunteer skills: {skills}. Interests: {interests}. " +
               $"Candidate events (JSON): {eventsJson}. Rank the top 5 best-fit events.";
    }
}

public class AiSettings
{
    public string ApiKey { get; set; } = default!;
    public string Model { get; set; } = "gpt-4.1-mini";
    public string BaseUrl { get; set; } = "https://api.openai.com/v1/";
}

internal sealed record OpenAiChatResponse(List<OpenAiChoice> Choices);
internal sealed record OpenAiChoice(OpenAiMessage Message);
internal sealed record OpenAiMessage(string Content);