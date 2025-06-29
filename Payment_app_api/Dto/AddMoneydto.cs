namespace SKYTM_VTP.Dto
{
    public class AddMoneydto
    {
        public int TransactionId { get; internal set; }
        public int UserId { get; set; }
        public string Username { get; internal set; }
        public string PhoneNumber { get; internal set; }
       
        public decimal AddedAmount { get; set; }
        public decimal Amount { get; set; }
        public object SenderId { get; internal set; }
        public object ReceiverId { get; internal set; }
    }
}
