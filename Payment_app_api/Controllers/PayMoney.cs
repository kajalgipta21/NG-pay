using Azure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;
using System;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PayMoney : Controller
    {
        private readonly AppDbContext _context;


        public PayMoney(AppDbContext context)
        {
            _context = context;
        }
        public int TransactionId { get;internal set; }
        public int UserId { get; internal set; }
        public int SenderId { get; internal set; }
        public int ReciverId { get; internal set; }
        public string PhoneNumber { get; internal set; }
        public string SenderPhoneNumber { get; internal set; }
        public string ReciverPhoneNumber { get; internal set; }
        public string TransactionType { get; internal set; }
        public DateTime TransactionDate { get; internal set; } 
        public decimal InitialAmount { get; internal set; }
        public decimal TransferAmount { get; internal set; }


        [HttpPost("pay")]
        public ApiResponse PayMoneyToUser([FromBody] PayMoneydto dto)
        {
            ApiResponse response = new ApiResponse();

            try
            {
                var sender = _context.Register.FirstOrDefault(u => u.UserId == dto.SenderId && u.PhoneNumber == dto.SenderPhoneNumber);
                var receiver = _context.Register.FirstOrDefault(u => u.UserId == dto.ReceiverId && u.PhoneNumber == dto.ReceiverPhoneNumber);

                if (sender == null || receiver == null)
                {
                    response.Response = "Sender or Receiver not found";
                    response.ResponseCode = "404";
                    return response;
                }

                if (sender.Amount < dto.Amount)
                {
                    response.Response = "Insufficient balance";
                    response.ResponseCode = "402";
                    return response;
                }

                var transaction = new Transaction
                {
                    UserId = dto.SenderId,
                    ReciverId = dto.ReceiverId,
                    PhoneNumber = dto.SenderPhoneNumber,
                    ReciverPhoneNumber = dto.ReceiverPhoneNumber,
                    InitialAmount = sender.Amount,
                    TransferAmount = dto.Amount,
                    TransactionType = "PayMoney",
                    TransactionDate = DateTime.UtcNow
                };

               
                sender.Amount -= dto.Amount;
                receiver.Amount += dto.Amount;

                _context.PayMoney.Add(Transaction); 
                _context.SaveChanges();

                response.Result = transaction;
                response.Response = "Money transferred successfully";
                response.ResponseCode = "200";
                return response;
            }
            catch (Exception ex)
            {
                response.Response = ex.Message;
                response.ResponseCode = "500";
                return response;
            }
        }
    } }

