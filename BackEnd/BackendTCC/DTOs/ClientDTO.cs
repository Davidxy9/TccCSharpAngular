namespace BackendTCC.DTOs
{
    public class ClientDTO
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Avatar { get; set; }

        public string? Cnpj { get; set; }

        public string? Cpf { get; set; }

        public string? StateRegistration { get; set; }

        public string? Rg { get; set; }

        public DateTime? Birthday { get; set; }

        public string? Complement { get; set; }

        public string? Cep { get; set; }

        public string? Address { get; set; }

        public string? Number { get; set; }

        public string? District { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public int? IbgeCode { get; set; }

        public string? ReferencePoint { get; set; }

        public string? Email { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public virtual ICollection<PhoneDTO>? Phones { get; set; }
    }
}
