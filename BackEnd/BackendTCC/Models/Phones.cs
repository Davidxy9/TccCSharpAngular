using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BackendTCC.Models;

public class Phones
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(40)]
    public string? ContactNumber { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    [Required]
    public int ClientsId { get; set; }

    [JsonIgnore]
    public Clients? Client { get; set; }
}
