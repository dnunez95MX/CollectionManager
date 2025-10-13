using CollectionManager.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CollectionManager.Server
{
    public class CollectionManagerContext : DbContext
    {
        public CollectionManagerContext(DbContextOptions options) : base(options) 
        {
        }
        public DbSet<Jersey> Jerseys { get; set; }
    }
}
