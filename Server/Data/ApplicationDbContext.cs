using Microsoft.EntityFrameworkCore;

namespace Server.Data;

public class ApplicationDbContext : DbContext
{
    // コンパイラのNullableチェックを以下に倣って回避
    // https://docs.microsoft.com/ja-jp/ef/core/miscellaneous/nullable-reference-types
    public DbSet<Models.Todo> Todos => Set<Models.Todo>();

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
