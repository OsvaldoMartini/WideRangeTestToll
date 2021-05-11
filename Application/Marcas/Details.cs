using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Marcas
{
    public class Details
    {
        public class Query : IRequest<MarcaDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, MarcaDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<MarcaDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var marca = await _context.Marcas
                    .FindAsync(request.Id);

                if (marca == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Marca = "Not found" });

                var marcaToReturn = _mapper.Map<Marca, MarcaDto>(marca);

                return marcaToReturn;
            }
        }
    }
}