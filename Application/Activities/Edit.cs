using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }


        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                //SetValidator is used so we could reuse our validator (Read the docs)
                RuleFor(x => x.Activity).SetValidator(new ActivitiyValidator());
            }
        }

        public class Handler : IRequestHandler<Command , Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this._mapper = mapper;
                this._context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if(activity == null) return null;

                

                //Map takes two parameters the first is the source the second the distination

                _mapper.Map(request.Activity, activity);


                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Faliure("Failed to update Activity");
                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}