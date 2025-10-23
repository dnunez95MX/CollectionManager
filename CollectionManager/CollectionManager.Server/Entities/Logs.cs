namespace CollectionManager.Server.Models
{
    public class Logs
    {
        public int Id { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string Message { get; set; } = string.Empty;
    }
}
