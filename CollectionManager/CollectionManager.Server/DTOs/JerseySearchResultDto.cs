using System.Text.Json.Serialization;

namespace CollectionManager.Server.DTOs
{
    public class JerseySearchResultDto
    {
        [JsonPropertyName("title")]
        public string Title { get; set; }
        [JsonPropertyName("team")]
        public string Team { get; set; }
        [JsonPropertyName("size")]
        public string Size { get; set; }
        [JsonPropertyName("brand")]
        public string Brand { get; set; }
        [JsonPropertyName("price")]
        public string Price { get; set; }
        [JsonPropertyName("url")]
        public string URL { get; set; }
        [JsonPropertyName("photos")]
        public string[] Photos { get; set; } = Array.Empty<string>();
        [JsonPropertyName("status")]
        public string? Status { get; set; }
        [JsonPropertyName("user")]
        public string? User { get; set; }
        [JsonPropertyName("favorite_count")]
        public int FavoriteCount { get; set; }
        [JsonPropertyName("description")]
        public string? Description { get; set; }
        [JsonPropertyName("posted_at")]
        public DateTime PostedAt { get; set; }
    }
}
