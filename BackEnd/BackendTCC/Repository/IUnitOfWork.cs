using BackendTCC.Repository;

namespace BackendTCC.Repository
{
    public interface IUnitOfWork
    {
        IClientsRepository ClientsRepository { get; }
        IPhonesRepository PhonesRepository { get; }

        Task Commit();
    }
}
