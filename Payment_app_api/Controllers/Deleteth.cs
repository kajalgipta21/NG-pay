using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Deleteth : Controller
    {
        private readonly AppDbContext _context;


        public Deleteth(AppDbContext context)
        {
            _context = context;
        }

        public int TransactionId { get;internal set; }
        public int UserId { get; internal set; }
        public int ReciverId { get; internal set; }
        public string TransactionType { get; internal set; }
        public string PhoneNumber { get; internal set; }
        public DateTime TransactionDate { get; internal set; } = DateTime.UtcNow;

        public decimal TransactionAmount { get; internal set; }

        [HttpDelete("delete")]
        public ApiResponse DeleteTransaction([FromBody] Deletethdto dto)
        {
            ApiResponse response = new ApiResponse();

            try
            {
                var Transaction = _context.Transactions
                    .FirstOrDefault(t => t.TransactionId == dto.TransactionId && t.UserId == dto.UserId);

                if (Transaction == null)
                {
                    response.Response = "Transaction not found or not authorized";
                    response.ResponseCode = "404";
                    return response;
                }

                _context.Transactions.Remove(Transaction);
                _context.SaveChanges();

                response.Response = "Transaction deleted successfully";
                response.ResponseCode = "200";
                return response;
            }
            catch (Exception ex)
            {
                response.Response = $"Error: {ex.Message}";
                response.ResponseCode = "500";
                return response;
            }
        }

    }
}

