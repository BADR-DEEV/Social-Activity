using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using System.Collections.Generic;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities
{
    public class List
    {

        public class Query : IRequest<List<Activity>>{}
        
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
        private readonly DataContext _context;
            public Handler(DataContext context)
            {
            this._context = context;
            }

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
               return await _context.Activities.ToListAsync();
            }
        }

    }
}