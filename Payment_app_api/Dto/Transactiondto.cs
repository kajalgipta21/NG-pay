namespace SKYTM_VTP.Dto
{
    public class Transactiondto
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        
        public string PhoneNumber { get; set; }
       
        
        public string ReciverPhoneNumber { get; set; }
        public string SenderPhoneNumber { get; set; }
        public string TransactionType { get; set; }
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
       
        public decimal TransferAmount { get; set; }
    }
}
