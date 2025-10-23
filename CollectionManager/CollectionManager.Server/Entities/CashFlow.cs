namespace CollectionManager.Server.Models
{
    public class CashFlow
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public bool IsSale { get; set; }
    }
}
