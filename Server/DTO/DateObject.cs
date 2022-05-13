namespace Server.DTO;

/// <summary>
/// 日時オブジェクトのDTOクラス
/// </summary>
public class DateObject
{
    /// <summary>年</summary>
    public int Year { get; set; }
    /// <summary>月</summary>
    public int Month { get; set; }
    /// <summary>日</summary>
    public int Day { get; set; }
    /// <summary>時</summary>
    public int Hour { get; set; }
    /// <summary>分</summary>
    public int Minute { get; set; }
    /// <summary>秒</summary>
    public int Second { get; set; }
    /// <summary>ミリ秒</summary>
    public int MilliSecond { get; set; }

    /// <summary>
    /// すべてのプロパティを0初期化してインスタンスを作成します
    /// </summary>
    /// <remarks>
    /// ApiControllerでインスタンス作成する際、プロパティなしのコンストラクタが必要なため用意しています。<br/>
    /// コードからは使用しないでください。
    /// </remarks>
    public DateObject()
    {
        this.Year = this.Month = this.Day = this.Hour = this.Minute = this.Second = this.MilliSecond = 0;
    }

    /// <summary>
    /// 日時を指定してインスタンスを初期化します
    /// </summary>
    /// <param name="year">年</param>
    /// <param name="month">月</param>
    /// <param name="day">日</param>
    /// <param name="hour">時</param>
    /// <param name="minute">分</param>
    /// <param name="second">秒</param>
    /// <param name="MilliSecond">ミリ秒</param>
    public DateObject(int year, int month, int day, int hour, int minute, int second, int MilliSecond)
    {
        this.Year = year;
        this.Month = month;
        this.Day = day;
        this.Hour = hour;
        this.Minute = minute;
        this.Second = second;
        this.MilliSecond = MilliSecond;
    }

    /// <summary>
    /// DateTimeオブジェクトの値からインスタンスを初期化します
    /// </summary>
    /// <param name="date">日時</param>
    public DateObject(DateTime date)
        : this(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second, date.Millisecond)
    {

    }

    /// <summary>
    /// DateTimeオブジェクトに変換します
    /// </summary>
    /// <returns>DateTimeオブジェクト</returns>
    public DateTime ToDateTime()
        => new DateTime(this.Year, this.Month, this.Day, this.Hour, this.Minute, this.Second, this.MilliSecond);
}
