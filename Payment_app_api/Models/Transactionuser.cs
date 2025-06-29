using System.ComponentModel.DataAnnotations;

namespace SKYTM_VTP.Models
{
    public class Transactionuser
    {
        [Key]
        public int TransactionId { get; set; }
        [Key]
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int ReciverId { get; set; }
        public string TransactionType { get; set; }
        [Key]
        public string PhoneNumber { get; set; }
        public string ReciverName { get; set; }
        public string SenderName { get; set; }
        public string ReciverPhoneNumber { get; set; }
        public string SenderPhoneNumber { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        public decimal InitialAmount { get; set; }
        public decimal TransferAmount { get; set; }
        public int SenderId { get; set; }
        public decimal Amount { get; set; }
    }
}
    

