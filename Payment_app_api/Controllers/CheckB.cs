using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckB : Controller
    {
        private readonly AppDbContext _context;


        public CheckB(AppDbContext context)
        {
            _context = context;
        }
        public string Username { get;internal set; }
        public int UserId { get; internal set; }
        public string PhoneNumber { get; internal set; }

        public string Password { get; internal set; }
        public decimal Amount { get; internal set; }

        [HttpGet("balance/{UserId}")]
        public ApiResponse GetBalance(int UserId)
        {
            ApiResponse response = new ApiResponse();

            try
            {
                var user = _context.Register.FirstOrDefault(u => u.PhoneNumber == PhoneNumber || u.Password == Password);

                if (user == null)
                {
                    response.Response = "User not found";
                    response.ResponseCode = "404";
                    return response;
                }

                var Transaction = new Transaction
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    PhoneNumber = user.PhoneNumber,
                    Amount = user.Amount
                };


                response.Result = Transaction;
                response.Response = "Balance fetched successfully";
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
    }
}
