namespace SKYTM_VTP.Dto
{
    public class Deletethdto
    {
       
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public int ReciverId { get; set; }
        public string TransactionType { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        public decimal TransactionAmount { get; set; }
    }
}
