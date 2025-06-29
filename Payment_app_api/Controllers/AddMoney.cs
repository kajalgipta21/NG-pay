using Azure;
using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;
using SKYTM_VTP.Models;
using System.Diagnostics.Eventing.Reader;
using System.Reflection;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddMoney : Controller
    {
        private readonly AppDbContext _context;


        public AddMoney(AppDbContext context)
        {
            _context = context;
        }

        public int TransactionId { get; internal set; }
        public int UserId { get; internal set; }
        public string Username { get; internal set; }
        public string PhoneNumber { get; internal set; }
        
        public string TransactionType { get; internal set; } = "AddMoney";
        public DateTime TransactionDate { get; internal set; } = DateTime.UtcNow;

        public decimal InitialAmount { get; internal set; }
        public decimal AddedAmount { get; internal set; }

        [HttpPost("add")]
        public ApiResponse AddMoneyToUser([FromBody] AddMoneydto dto)
        {
            ApiResponse response = new ApiResponse();

            try
            {
                var user = _context.Register.FirstOrDefault(u => u.PhoneNumber == dto.PhoneNumber);

                if (user == null)
                {
                    response.Response = "User not found";
                    response.ResponseCode = "404";
                    return response;
                }
                var Transaction = new Transaction
                {
                    UserId = dto.UserId,
                    PhoneNumber = dto.PhoneNumber,
                    
                    
                    InitialAmount = user.Amount - dto.Amount,
                    TransferAmount = dto.Amount,
                    TransactionType = "AddMoney",
                    
                };



               
                    user.Amount += dto.AddedAmount;

                _context.AddMoney.Add(Transaction);
                    _context.SaveChanges();
                    {

                    }

                response.Result = Transaction;
                response.Response = "Money added successfully";
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


        