using VMS.Application.Common.Interfaces;
using VMS.Infrastructure.AI;

Services.AddHttpClient<IAiRecommendationService, OpenAiRecommendationService>(client =>
{
    client.BaseAddress = new Uri(configuration["Ai:BaseUrl"]!);
    client.Timeout = TimeSpan.FromSeconds(20);
});