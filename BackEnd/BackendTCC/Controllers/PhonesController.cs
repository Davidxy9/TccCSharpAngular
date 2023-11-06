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

        [HttpGet("client")]
        public async Task<ActionResult<IEnumerable<PhoneDTO>>> GetPhonesForClientId()
        {
            var phones = await _context.PhonesRepository.GetPhonesForClientId();
            var phonesDto = _mapper.Map<List<PhoneDTO>>(phones);

            return phonesDto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhoneDTO>>> Get()
        {
            var phones = await _context.PhonesRepository.Get().ToListAsync();

            var phonesDto = _mapper.Map<List<PhoneDTO>>(phones);
            return phonesDto;
        }

        // api/produtos/1
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

        //  api/produtos
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PhoneDTO phoneDto)
        {
            var phone = _mapper.Map<Phones>(phoneDto);

            _context.PhonesRepository.Add(phone);
            await _context.Commit();

            var phoneDTO = _mapper.Map<PhoneDTO>(phone);

            return new CreatedAtRouteResult("GetPhone",
               new { id = phone.Id }, phoneDTO);
        }

        // api/produtos/1
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
