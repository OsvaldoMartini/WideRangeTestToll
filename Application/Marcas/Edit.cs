using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Marcas
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public DateTime? Expire { get; set; }
            public string ProcessoNumber { get; set; }
            public string Procurador { get; set; }
            public string Proprietario { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Expire).NotEmpty();
                RuleFor(x => x.ProcessoNumber).NotEmpty();
                RuleFor(x => x.Procurador).NotEmpty();
                RuleFor(x => x.Proprietario).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var marca = await _context.Marcas.FindAsync(request.Id);

                if (marca == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Marca = "Not found" });

                marca.Title = request.Title ?? marca.Title;
                marca.Description = request.Description ?? marca.Description;
                marca.Category = request.Category ?? marca.Category;
                marca.Date = request.Date ?? marca.Date;
                marca.Expire = request.Expire ?? marca.Expire;
                marca.ProcessoNumber = request.ProcessoNumber ?? marca.ProcessoNumber;
                marca.Procurador = request.Procurador ?? marca.Procurador;
                marca.Proprietario = request.Proprietario ?? marca.Proprietario;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}