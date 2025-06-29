using Microsoft.EntityFrameworkCore;
using SKYTM_VTP.Models;

namespace SKYTM_VTP.Data
{
    public class AppDbContext:DbContext
    {
       

        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
        {
        }
        
        public DbSet<Registeruser> Registeruser { get; set; }
        public DbSet<Transactionuser> Transactionuser { get; set; }

    }
}
