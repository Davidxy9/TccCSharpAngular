using BackendTCC.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BackendTCC.Context
{
    public class AppDbContext : IdentityDbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options ) : base( options )
        {}

        //protected override void OnModelCreating(ModelBuilder modelBuilder) : base()
        //{
        //    modelBuilder.Entity<IdentityUserLogin<string>>()
        //    .HasKey(l => new { l.LoginProvider, l.ProviderKey });

        //    modelBuilder.Entity<Clients>()
        //        .HasAlternateKey(c => c.Cnpj)
        //        .HasName("AlternateKey_Cnpj");

        //    modelBuilder.Entity<Clients>()
        //        .HasAlternateKey(c => c.Cpf)
        //        .HasName("AlternateKey_Cpf");

        //    modelBuilder.Entity<Clients>()
        //        .HasAlternateKey(c => c.StateRegistration)
        //        .HasName("AlternateKey_StateRegistration");

        //    modelBuilder.Entity<Clients>()
        //        .HasAlternateKey(c => c.Rg)
        //        .HasName("AlternateKey_Rg");
        //}

        public DbSet<Clients>? Clients { get; set; }
        public DbSet<Phones>? Phones { get; set; }

    }
}
