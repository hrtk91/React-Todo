using System.ComponentModel;

namespace Server.DTO;

public class Todo
{
    public int Id { get; set; }

    [DefaultValue("")]
    public string Content { get; set; } = string.Empty;

    public DateTime DueDate { get; set; } = DateTime.Today;

    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime? DoneAt { get; set; }

    public static DTO.Todo From(Models.Todo todo)
    {
        return new DTO.Todo
        {
            Id = todo.Id,
            Content = todo.Content,
            DueDate = todo.DueDate,
            Created = todo.Created,
            DoneAt = todo.DoneAt,
        };
    }
}
