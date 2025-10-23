namespace CollectionManager.Server.Models
{
    public class Jersey
    {
        public int Id { get; set; }
        public string Team { get; set; }
        public string League { get; set; }
        public int Year { get; set; }
        public bool IsFlocked { get; set; }
        public bool IsLongSleeve { get; set; }
        public string? JerseyName { get; set; }
        public int? JerseyNumber { get; set; }
    }
}
