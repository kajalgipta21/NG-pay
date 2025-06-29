namespace SKYTM_VTP.Dto
{
    public class Logindto
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Gender { get; set; }
        
        public decimal Amount { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreateDate { get; set; } 
        public bool IsAdmin { get; set; } = false;
        public object Password { get; internal set; }
    }
}
