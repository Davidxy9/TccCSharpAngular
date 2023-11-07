using BackendTCC.Context;
using BackendTCC.Models;
using BackendTCC.Pagination;
using Microsoft.EntityFrameworkCore;

namespace BackendTCC.Repository
{
    public class PhonesRepository : Repository<Phones>, IPhonesRepository
    {
        public PhonesRepository(AppDbContext contexto) : base(contexto)
        {
        }

        public async Task<PagedList<Phones>> GetPhones(PhonesParameters phonesParameters)
        {
            return await PagedList<Phones>.ToPagedList(Get().OrderBy(on => on.Id),
            phonesParameters.PageNumber, phonesParameters.PageSize);
        }

        public async Task<IEnumerable<Phones>> GetPhonesForClientId(int clientId)
        {
            return await Get().Where(c => c.ClientsId == clientId).OrderBy(c => c.ClientsId).ToListAsync();
        }

    }
}
