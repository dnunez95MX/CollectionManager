using CollectionManager.Server.Models;

namespace CollectionManager.Server.Interfaces
{
    public interface IInformationLogService
    {
        public Task<List<Logs>> GetSearchLogs();
        public Task LogLatestSearch(string? message);
    }
}
