using AutoMapper;
using BackendTCC.DTOs;
using BackendTCC.Models;
using BackendTCC.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendTCC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;
        public PhonesController(IUnitOfWork contexto, IMapper mapper)
        {
            _context = contexto;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhoneDTO>>> Get()
        {
            var phones = await _context.PhonesRepository.Get().ToListAsync();

            var phonesDto = _mapper.Map<List<PhoneDTO>>(phones);
            return phonesDto;
        }

        [HttpGet("{id}", Name = "GetPhone")]
        public async Task<ActionResult<PhoneDTO>> Get(int id)
        {
            var phone = await _context.PhonesRepository.GetById(p => p.Id == id);

            if (phone == null)
            {
                return NotFound();
            }

            var phoneDto = _mapper.Map<PhoneDTO>(phone);
            return phoneDto;
        }

        [HttpGet("/clients/{id}")]
        public async Task<ActionResult<IEnumerable<PhoneDTO>>> GetPhonesForClientId(int id)
        {
            var phone = await _context.PhonesRepository.GetPhonesForClientId(id);

            if (phone == null)
            {
                return NotFound();
            }

            var phoneDto = _mapper.Map<List<PhoneDTO>>(phone);
            return phoneDto;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PhoneDTO phoneDto)
        {
            if (id != phoneDto.Id)
            {
                return BadRequest();
            }

            var phone = _mapper.Map<Phones>(phoneDto);

            _context.PhonesRepository.Update(phone);

            await _context.Commit();

            return Ok();
        }
    }
}
