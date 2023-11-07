using System;
using System.Linq;
using System.Linq.Expressions;

namespace BackendTCC.Repository
{
    public interface IRepository<T>
    {
        IQueryable<T> Get();
        Task<T> GetById(Expression<Func<T, bool>> predicate);
        Task<T> GetByIdWithPhones(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);

    }
}
