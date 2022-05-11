using System.ComponentModel.DataAnnotations;
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
    public async Task<ActionResult<IEnumerable<DTO.Todo>>> GetAll()
    {
        try
        {
            var todos = (await context.Todos.ToListAsync())
                .Select(x => DTO.Todo.From(x))
                .OrderByDescending(x => x.Id)
                .ToList();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの全取得に失敗しました。");
            throw;
        }
    }

    [HttpGet(Name = "GetNotCompletedTodo")]
    [Produces("application/json")]
    public async Task<ActionResult<IEnumerable<DTO.Todo>>> GetNotCompleted()
    {
        try
        {
            var todos = (await context.Todos.Where(x => x.DoneAt == null).ToListAsync())
                .Select(x => DTO.Todo.From(x))
                .OrderByDescending(x => x.Id)
                .ToList();
            return Ok(todos);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの全取得に失敗しました。");
            throw;
        }
    }

    [HttpGet(Name = "GetCompletedTodo")]
    [Produces("application/json")]
    public async Task<ActionResult<IEnumerable<DTO.Todo>>> GetCompleted()
    {
        try
        {
            var todos = (await context.Todos.Where(x => x.DoneAt != null).ToListAsync())
                .Select(x => DTO.Todo.From(x))
                .OrderByDescending(x => x.Id)
                .ToList();
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
    public async Task<IActionResult> Create(DTO.Todo dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            await context.Todos.AddAsync(new Models.Todo
            {
                Content = dto.Content,
                Created = DateTime.UtcNow,
                DueDate = dto.DueDate.ToDateTime(),
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

    [HttpPatch(Name = "UpdateTodo")]
    [Produces("application/json")]
    public async Task<IActionResult> Update(DTO.Todo dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest();
        }

        try
        {
            var todo = await context.Todos.SingleAsync(x => x.Id == dto.Id);
            todo.Content = dto.Content;
            todo.DueDate = dto.DueDate.ToDateTime();
            todo.DoneAt = dto.DoneAt?.ToDateTime();
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの変更に失敗しました。");
            throw;
        }

        return Ok();
    }

    [HttpDelete(Name = "DeleteTodo")]
    [Produces("application/json")]
    public async Task<IActionResult> Delete([Required]int id)
    {
        try
        {
            var todo = await context.Todos.SingleAsync(x => x.Id == id);
            context.Todos.Remove(todo);
            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Todoの削除に失敗しました。");
            throw;
        }

        return NoContent();
    }
}
