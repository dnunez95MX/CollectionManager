using CollectionManager.Server.Interfaces;
using CollectionManager.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CollectionManager.Server.Services
{
    public class InformationLogService : IInformationLogService
    {
        private readonly CollectionManagerContext _context;
        public InformationLogService(CollectionManagerContext context)
        {
            _context = context;
        }

        public async Task<List<Logs>> GetSearchLogs()
        {
            var result = await _context.Logs
                .OrderByDescending(log => log.UpdatedAt)
                .ToListAsync();

            return result;
        }

        public async Task LogLatestSearch(string? message)
        {
            var updateSearch = new Logs
            {
                Message = message ?? string.Empty,
                UpdatedAt = DateTime.UtcNow
            };

            await _context.Logs.AddAsync(updateSearch);
            await _context.SaveChangesAsync();
        }
    }
}
