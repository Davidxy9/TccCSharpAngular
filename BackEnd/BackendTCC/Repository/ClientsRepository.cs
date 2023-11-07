using BackendTCC.Context;
using BackendTCC.Models;
using BackendTCC.Pagination;
using Microsoft.EntityFrameworkCore;

namespace BackendTCC.Repository
{
    public class ClientsRepository : Repository<Clients>, IClientsRepository
    {
        public ClientsRepository(AppDbContext contexto) : base(contexto)
        {
        }

        public async Task<PagedList<Clients>> GetClients(ClientsParameters clientsParameters)
        {
            return await PagedList<Clients>.ToPagedList(Get().OrderBy(on => on.Id),
                clientsParameters.PageNumber,
                clientsParameters.PageSize);
        }

        public async Task<IEnumerable<Clients>> GetClientsPhones()
        {
            return await Get().Include(x => x.Phones).ToListAsync();
        }

        public async Task<IEnumerable<Clients>> GetClientsByName(string search)
        {
            return await Get().Where(c => c.Name.ToLower().Contains(search.ToLower())).OrderBy(c => c.Id).ToListAsync();
        }

    }
}
