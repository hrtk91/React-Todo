using System.ComponentModel.DataAnnotations;

namespace Server.Models;

public class Todo
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = string.Empty;

    [Required]
    public DateTime DueDate { get; set; } = DateTime.Today;

    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime? DoneAt { get; set; }
}
