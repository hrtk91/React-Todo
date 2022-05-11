namespace Server.DTO;

public class DateObject
{
    public int Year { get; set; }
    public int Month { get; set; }
    public int Day { get; set; }
    public int Hour { get; set; }
    public int Minute { get; set; }
    public int Second { get; set; }
    public int MilliSecond { get; set; }

    public DateObject()
    {
        this.Year = this.Month = this.Day = this.Hour = this.Minute = this.Second = this.MilliSecond = 0;
    }

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

    public DateObject(DateTime date)
        : this(date.Year, date.Month, date.Day, date.Hour, date.Minute, date.Second, date.Millisecond)
    {

    }

    public DateTime ToDateTime()
        => new DateTime(this.Year, this.Month, this.Day, this.Hour, this.Minute, this.Second, this.MilliSecond);
}
