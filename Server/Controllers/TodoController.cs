using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;

namespace Server.Controllers;

/// <summary>
/// TodoApiコントローラー
/// </summary>
[ApiController]
[Route("[controller]/[action]")]
public class TodoController : ControllerBase
{
    /// <summary>
    /// ロガー
    /// </summary>
    ILogger<TodoController> logger { get; }

    /// <summary>
    /// TodoDBコンテキスト
    /// </summary>
    ApplicationDbContext context { get; }

    /// <summary>
    /// コンストラクタ
    /// </summary>
    /// <param name="logger">ロガー</param>
    /// <param name="context">TodoDBコンテキスト</param>
    public TodoController(ILogger<TodoController> logger, ApplicationDbContext context)
    {
        this.logger = logger;
        this.context = context;
    }

    /// <summary>
    /// DBから全Todoを取得します
    /// </summary>
    /// <returns>すべてのTodo</returns>
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

    /// <summary>
    /// DBから未完了のTodoのみを取得します
    /// </summary>
    /// <returns>未完了のTodo</returns>
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
            logger.LogError(ex, "未完了Todoのみの取得に失敗しました。");
            throw;
        }
    }

    /// <summary>
    /// DBから完了したTodoのみを取得します
    /// </summary>
    /// <returns>完了したTodo</returns>
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
            logger.LogError(ex, "完了済みTodoのみの取得に失敗しました。");
            throw;
        }
    }

    /// <summary>
    /// Todoを作成します
    /// </summary>
    /// <param name="dto">Todoのデータ</param>
    /// <returns>処理結果</returns>
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

    /// <summary>
    /// Todoを更新します
    /// </summary>
    /// <param name="dto">Todoのデータ</param>
    /// <returns>処理結果</returns>
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

    /// <summary>
    /// Todoを削除します
    /// </summary>
    /// <param name="id">削除するTodoのID</param>
    /// <returns>処理結果</returns>
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
