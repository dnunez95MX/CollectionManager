namespace CollectionManager.Server.Models
{
    public class CollectionItem : Jersey
    {
        public bool IsMainRack { get; set; }
        public string? Location { get; set; }
    }
}
