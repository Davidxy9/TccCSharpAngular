using BackendTCC.Context;
using BackendTCC.Repository;

namespace BackendTCC.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private ClientsRepository _clientsRepo;
        private PhonesRepository _phonesRepo;
        public AppDbContext _context;
        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public IClientsRepository ClientsRepository
        {
            get
            {
                return _clientsRepo = _clientsRepo ?? new ClientsRepository(_context);
            }
        }

        public IPhonesRepository PhonesRepository
        {
            get
            {
                return _phonesRepo = _phonesRepo ?? new PhonesRepository(_context);
            }
        }


        public async Task Commit()
        {
            await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

    }
}
