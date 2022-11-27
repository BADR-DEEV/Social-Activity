using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());
            return HandleResult(result);

        }

        [HttpGet("{id}")]

        //we removed actionResult<T> with IAction because IActionResult have built in http responses
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return HandleResult(result);
            // return await _mediator.Activities.FindAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {

            var result = await Mediator.Send(new Create.Command { Activity = activity });
            return HandleResult(result);
            // Ok(await Mediator.Send(new Create.Command { Activity = activity }));

            // return await GetActivity(activity.Id);
            // return await _mediator.Activities.FindAsync(id);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));

        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            
            
           return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
          

        }
    }
}