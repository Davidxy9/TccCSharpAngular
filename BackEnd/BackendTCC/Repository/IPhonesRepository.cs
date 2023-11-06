using BackendTCC.Models;
using BackendTCC.Pagination;

namespace BackendTCC.Repository
{
    public interface IPhonesRepository : IRepository<Phones>
    {
        Task<PagedList<Phones>> GetPhones (PhonesParameters phonesParameters);
        Task<IEnumerable<Phones>> GetPhonesForClientId();
    }
}
