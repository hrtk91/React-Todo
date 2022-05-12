using System.ComponentModel.DataAnnotations;

namespace Server.DTO;

public class Todo
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = string.Empty;

    public DateObject DueDate { get; set; } = new DateObject(DateTime.Today);

    public DateObject Created { get; set; } = new DateObject(DateTime.Now);

    public DateObject? DoneAt { get; set; } = null;

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
