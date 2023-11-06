using BackendTCC.Models;
using BackendTCC.Pagination;

namespace BackendTCC.Repository;

public interface IClientsRepository :IRepository<Clients>
{
    Task<PagedList<Clients>> GetClients(ClientsParameters clientsParameters);
    Task<IEnumerable<Clients>> GetClientsPhones();
}


