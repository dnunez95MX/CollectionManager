namespace CollectionManager.Server.Models
{
    public class SaleItem : Jersey
    {
        public int Price { get; set; }
        public string? Condition { get; set; }
        public string Link { get; set; }
    }
}
