using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Marcas
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime Date { get; set; }
            public DateTime Expire { get; set; }
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
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var marca = new Marca
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    Expire = request.Expire,
                    ProcessoNumber = request.ProcessoNumber,
                    Procurador = request.Procurador,
                    Proprietario = request.Proprietario
                };

                _context.Marcas.Add(marca);

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendee = new UserMarca
                {
                    AppUser = user,
                    Marca = marca,
                    IsHost = true,
                    DateJoined = DateTime.Now
                };

                _context.UserMarcas.Add(attendee);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}