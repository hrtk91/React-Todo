using System.ComponentModel.DataAnnotations;

namespace Server.DTO;

/// <summary>
/// TodoのDTOクラス
/// </summary>
public class Todo
{
    /// <summary>ID</summary>
    public int Id { get; set; }

    /// <summary>内容</summary>
    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = string.Empty;

    /// <summary>予定日</summary>
    public DateObject DueDate { get; set; } = new DateObject(DateTime.Today);

    /// <summary>作成日</summary>
    public DateObject Created { get; set; } = new DateObject(DateTime.Now);

    /// <summary>完了日</summary>
    public DateObject? DoneAt { get; set; } = null;

    /// <summary>
    /// TodoモデルからTodoのDTOに変換します
    /// </summary>
    /// <param name="todo">Todoモデル</param>
    /// <returns>TodoのDTO</returns>
    public static DTO.Todo From(Models.Todo todo)
    {
        return new DTO.Todo
        {
            Id = todo.Id,
            Content = todo.Content,
            DueDate = new DateObject(todo.DueDate),
            Created = new DateObject(todo.Created),
            DoneAt = todo.DoneAt is DateTime doneAt ? new DateObject(doneAt) : null,
        };
    }
}
