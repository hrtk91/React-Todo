using System.ComponentModel.DataAnnotations;

namespace Server.DTO;

/// <summary>
/// TodoのDTOクラス
/// </summary>
/// <remarks>
/// 日付データは転送後のJavaScript上での扱いやすさの視点で独自のDateObject型を使用  
/// JSではDate文字列の解釈がブラウザによってまちまちになるとMDNに記載があるため  
/// 参考(3.タイムスタンプ文字列の項)：https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
/// </remarks>
public class Todo
{
    /// <summary>ID</summary>
    public int Id { get; set; }

    /// <summary>内容</summary>
    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = string.Empty;

    /// <summary>予定日</summary>
    [DateObject.Validate]
    public DateObject DueDate { get; set; } = new DateObject(DateTime.Today);

    /// <summary>作成日</summary>
    [DateObject.Validate]
    public DateObject CreatedDate { get; set; } = new DateObject(DateTime.Now);

    /// <summary>完了日</summary>
    [DateObject.Validate(true)]
    public DateObject? CompletionDate { get; set; } = null;

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
            CreatedDate = new DateObject(todo.CreatedDate),
            CompletionDate = todo.CompletionDate is DateTime completionDate ? new DateObject(completionDate) : null,
        };
    }
}
