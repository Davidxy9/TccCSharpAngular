using AutoMapper;
using BackendTCC.DTOs;
using BackendTCC.Models;
using BackendTCC.Pagination;
using BackendTCC.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace BackendTCC.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        private readonly IUnitOfWork _context;
        private readonly IMapper _mapper;

        public ClientsController(IUnitOfWork contexto, IMapper mapper)
        {
            _context = contexto;
            _mapper = mapper;
        }
        //[Authorize]
        [HttpGet("phones")]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClientsPhones()
        {
            var clients = await _context.ClientsRepository
                            .GetClientsPhones();

            var clientsDto = _mapper.Map<List<ClientDTO>>(clients);
            return clientsDto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> Get([FromQuery] ClientsParameters clientsParameters)
        {
            var clients = await _context.ClientsRepository.
                                GetClients(clientsParameters);
            var metadata = new
            {
                clients.TotalCount,
                clients.PageSize,
                clients.CurrentPage,
                clients.TotalPages,
                clients.HasNext,
                clients.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

            var clientsDto = _mapper.Map<List<ClientDTO>>(clients);
            return clientsDto;
        }

        [HttpGet("search/{search}", Name = "GetClientByName")]
        public async Task<ActionResult<IEnumerable<ClientDTO>>> GetClientsByName(string search)
        {
            var client = await _context.ClientsRepository
                             .GetClientsByName(search);

            if (client == null)
            {
                return NotFound();
            }
            var clientDto = _mapper.Map<List<ClientDTO>>(client);
            return clientDto;
        }

        [HttpGet("{id}", Name = "GetClient")]
        public async Task<ActionResult<ClientDTO>> Get(int id)
        {
            var client = await _context.ClientsRepository
                             .GetById(p => p.Id == id);

            if (client == null)
            {
                return NotFound();
            }
            var clientDto = _mapper.Map<ClientDTO>(client);
            return clientDto;
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ClientDTO clientDto)
        {
            var client = _mapper.Map<Clients>(clientDto);

            _context.ClientsRepository.Add(client);
            await _context.Commit();

            var clientDTO = _mapper.Map<ClientDTO>(client);

            return new CreatedAtRouteResult("GetClient",
                new { id = client.Id }, clientDTO);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ClientDTO clientDto)
        {
            if (id != clientDto.Id)
            {
                return BadRequest();
            }

            var client = _mapper.Map<Clients>(clientDto);

            _context.ClientsRepository.Update(client);
            await _context.Commit();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ClientDTO>> Delete(int id)
        {
            var client = await _context.ClientsRepository
            .GetById(p => p.Id == id);

            if (client == null)
            {
                return NotFound();
            }
            _context.ClientsRepository.Delete(client);
            await _context.Commit();

            var clientDto = _mapper.Map<ClientDTO>(client);

            return clientDto;
        }


        //[HttpGet("produtos")]
        //public async Task<ActionResult<IEnumerable<CategoriaDTO>>> GetCategoriasProdutos()
        //{
        //    var categorias = await _context.CategoriaRepository
        //                    .GetCategoriasProdutos();

        //    var categoriasDto = _mapper.Map<List<CategoriaDTO>>(categorias);
        //    return categoriasDto;
        //}

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<CategoriaDTO>>>
        //    Get([FromQuery] CategoriasParameters categoriasParameters)
        //{
        //    var categorias = await _context.CategoriaRepository.
        //                        GetCategorias(categoriasParameters);

        //    var metadata = new
        //    {
        //        categorias.TotalCount,
        //        categorias.PageSize,
        //        categorias.CurrentPage,
        //        categorias.TotalPages,
        //        categorias.HasNext,
        //        categorias.HasPrevious
        //    };

        //    Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(metadata));

        //    var categoriasDto = _mapper.Map<List<CategoriaDTO>>(categorias);
        //    return categoriasDto;
        //}

        //[HttpGet("{id}", Name = "ObterCategoria")]
        ////[EnableCors("PermitirApiRequest")]
        //public async Task<ActionResult<CategoriaDTO>> Get(int id)
        //{
        //    var categoria = await _context.CategoriaRepository
        //                     .GetById(p => p.CategoriaId == id);

        //    if (categoria == null)
        //    {
        //        return NotFound();
        //    }
        //    var categoriaDto = _mapper.Map<CategoriaDTO>(categoria);
        //    return categoriaDto;
        //}

        //[HttpPost]
        //public async Task<ActionResult> Post([FromBody] CategoriaDTO categoriaDto)
        //{
        //    var categoria = _mapper.Map<Categoria>(categoriaDto);

        //    _context.CategoriaRepository.Add(categoria);
        //    await _context.Commit();

        //    var categoriaDTO = _mapper.Map<CategoriaDTO>(categoria);

        //    return new CreatedAtRouteResult("ObterCategoria",
        //        new { id = categoria.CategoriaId }, categoriaDTO);
        //}

        //[HttpPut("{id}")]
        //public async Task<ActionResult> Put(int id, [FromBody] CategoriaDTO categoriaDto)
        //{
        //    if (id != categoriaDto.CategoriaId)
        //    {
        //        return BadRequest();
        //    }

        //    var categoria = _mapper.Map<Categoria>(categoriaDto);

        //    _context.CategoriaRepository.Update(categoria);
        //    await _context.Commit();
        //    return Ok();
        //}

        //[HttpDelete("{id}")]
        //public async Task<ActionResult<CategoriaDTO>> Delete(int id)
        //{
        //    var categoria = await _context.CategoriaRepository
        //    .GetById(p => p.CategoriaId == id);

        //    if (categoria == null)
        //    {
        //        return NotFound();
        //    }
        //    _context.CategoriaRepository.Delete(categoria);
        //    await _context.Commit();

        //    var categoriaDto = _mapper.Map<CategoriaDTO>(categoria);

        //    return categoriaDto;
        //}
    }
}
