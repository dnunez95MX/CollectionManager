using CollectionManager.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CollectionManager.Server
{
    public class CollectionManagerContext : DbContext
    {
        public CollectionManagerContext(DbContextOptions options) : base(options) 
        {
        }
        public DbSet<CollectionItem> CollectionItems { get; set; }
        public DbSet<SearchItem> MonitoringSearches { get; set; }
        public DbSet<SaleItem> DroppedItems { get; set; }
        public DbSet<Logs> Logs { get; set; }
    }
}
