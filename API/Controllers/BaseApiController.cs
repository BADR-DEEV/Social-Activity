using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        //this is just the boilerblate of the mediator we dont want to rewrite it everytime
        private IMediator _mediator;

        //protected : is basicly private but it could be used from its inhreted classes
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();


        //our middleware to check if its success or not we used it so we could access to the http responses lile notFound
        //because only the [Apiconroller] has access to them and we want our controllers to be as clean as posible
        protected ActionResult HandleResult<T>(Result<T> result)
        {
            if (result == null) return NotFound();
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if (result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);

        }



    }
}