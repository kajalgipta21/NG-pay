using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;
using System;

namespace SKYTM_VTP.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class Transaction : Controller
    {
        
     
            private readonly AppDbContext _context;
            
            public Transaction(AppDbContext context)
            {
                _context = context;
            }
        public int TransactionId { get;internal set; }
        public int UserId { get; internal set; }
       
        public string ReciverPhoneNumber { get; set; }
        public string PhoneNumber { get; set; }
        public string SenderPhoneNumber { get; set; }
        public string TransactionType { get; internal set; }
        public DateTime TransactionDate { get; internal set; } = DateTime.UtcNow;
       
        public decimal TransferAmount { get; internal set; }
        [HttpGet("history")]
        public ApiResponse GetHistory([FromQuery] string phoneNumber)
        {
            var response = new ApiResponse();

            try
            {
                
                var History = _context.Transactions
                    .Where(t => t.PhoneNumber == phoneNumber)
                    .OrderByDescending(t => t.TransactionDate)
                    .ToList();

               
                if (History == null)
                {
                    response.Result = null;
                    response.Response = "No transactions found.";
                    response.ResponseCode = "404";
                    return response;
                }

                
                response.Result = History;
                response.Response = "Transactions fetched successfully.";
                response.ResponseCode = "200";
                return response;
            }
            catch (Exception ex)
            {
               
                response.Result = null;
                response.Response = "An error occurred: " + ex.Message;
                response.ResponseCode = "500";
                return response;
            }
        }
    }

    }

