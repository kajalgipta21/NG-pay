namespace SKYTM_VTP.Dto
{
    public class PayMoneydto
    {
        public int TransactionId { get; set; }
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string PhoneNumber { get; set; }
        public string ReceiverPhoneNumber { get; set; }
        public string SenderPhoneNumber { get; set; }
        public decimal Amount { get; set; }
    }
}
