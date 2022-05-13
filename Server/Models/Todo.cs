using System.ComponentModel.DataAnnotations;

namespace Server.Models;

/// <summary>
/// Todoモデル
/// </summary>
public class Todo
{
    /// <summary>
    /// ID
    /// </summary>
    /// <remarks>主キー</remarks>
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// 内容
    /// </summary>
    /// <remarks>NotNull</remarks>
    /// <remarks>最大100文字まで</remarks>
    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = string.Empty;

    /// <summary>
    /// 予定日
    /// </summary>
    /// <remarks>NotNull</remarks>
    [Required]
    public DateTime DueDate { get; set; } = DateTime.Today;

    /// <summary>
    /// 作成日
    /// </summary>
    /// <remarks>NotNull</remarks>
    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    /// <summary>
    /// 完了日
    /// </summary>
    /// <remarks>NotNull</remarks>
    public DateTime? DoneAt { get; set; }
}
