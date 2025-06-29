using System.ComponentModel.DataAnnotations;

namespace SKYTM_VTP.Models
{
    public class Registeruser
    {
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        [Key]
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
       
        public string Password { get; set; }
        public decimal Amount { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        public bool IsAdmin { get; set; } = false;
    }
}
