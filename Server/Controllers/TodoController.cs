using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class TodoController : ControllerBase
{
    ILogger<TodoController> logger { get; }

    ApplicationDbContext context { get; }

    public TodoController(ILogger<TodoController> logger, ApplicationDbContext context)
    {
        this.logger = logger;
        this.context = context;
    }

    [HttpGet(Name = "GetAllTodo")]
    [Produces("application/json")]
    public async Task<ActionResult<IEnumerable<DTO.Todo>>> Get()
    {
        try
        {
            var todos = (await context.Todos.ToListAsync()).Select(x => DTO.Todo.From(x)).ToList();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの全取得に失敗しました。");
            throw;
        }
    }

    [HttpPost(Name = "CreateTodo")]
    [Produces("application/json")]
    public async Task<IActionResult> Create(string content, DateTime dueDate)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            await context.Todos.AddAsync(new Models.Todo
            {
                Content = content,
                Created = DateTime.UtcNow,
                DueDate = dueDate,
            });
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの作成に失敗しました。");
            throw;
        }

        return Ok();
    }
}
