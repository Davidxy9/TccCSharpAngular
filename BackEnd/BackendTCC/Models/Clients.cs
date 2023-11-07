using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendTCC.Models;

public class Clients
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string? Name { get; set; }

    public string? Avatar { get; set; }

    [Required]
    [StringLength(20)]
    public string? Cnpj { get; set; }

    [Required]
    [StringLength(20)]
    public string? Cpf { get; set; }

    [StringLength(20)]
    public string? StateRegistration { get; set; }

    [StringLength(20)]
    public string? Rg { get; set; }

    public DateTime? Birthday { get; set; }

    [StringLength(20)]
    public string? Complement { get; set; }

    [StringLength(50)]
    public string? Cep { get; set; }

    [StringLength(100)]
    public string? Address { get; set; }

    [StringLength(20)]
    public string? Number { get; set; }

    [StringLength(20)]
    public string? District { get; set; }

    [StringLength(20)]
    public string? City { get; set; }

    [StringLength(20)]
    public string? State { get; set; }

    public int? IbgeCode { get; set; }

    [StringLength(20)]
    public string? ReferencePoint { get; set; }

    [StringLength(20)]
    public string? Email { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Phones>? Phones { get; set; }
}
