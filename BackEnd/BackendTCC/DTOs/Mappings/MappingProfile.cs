using AutoMapper;
using BackendTCC.DTOs;
using BackendTCC.Models;

namespace BackendTCC.DTOs.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Clients, ClientDTO>().ReverseMap();
            CreateMap<Phones, PhoneDTO>().ReverseMap();
        }
    }
}
