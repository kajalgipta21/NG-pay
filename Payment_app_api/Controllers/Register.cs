using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;
using SKYTM_VTP.Models;
using System.ComponentModel.DataAnnotations;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Register : Controller
    {
        private readonly AppDbContext _context;


        public Register(AppDbContext context)
        {
            _context = context;
        }

        [Key]
        public int UserId { get;internal set; }
        public string Username { get;internal set; }
        public string Email { get; internal set; }
        public string PhoneNumber { get; internal set; }
        public string Gender { get; internal set; }
        public string Password { get; internal set; }
        public decimal Amount { get; internal set; }
        public string ImageUrl { get; internal set; }
        public DateTime CreateDate { get; internal set; }
        public bool IsAdmin { get; internal set; }

        [HttpPost("register")]
        public ApiResponse RegisterUser([FromBody] Registerdto dto)
        {
            ApiResponse response = new ApiResponse();
            try
            {
               
                var existingUser = _context.Register.FirstOrDefault(u =>
                    u.PhoneNumber == dto.PhoneNumber || u.Email == dto.Email);

                if (existingUser != null)
                {
                    response.Result = null;
                    response.Response = "User already exists with this phone number or email";
                    response.ResponseCode = "409"; 
                    return response;
                }
                var register = new Registerdto
                {
                    UserId = dto.UserId,
                    Username = dto.Username,
                    Email = dto.Email,
                    PhoneNumber = dto.PhoneNumber,
                    Gender = dto.Gender,
                    Password = dto.Password,
                    Amount = dto.Amount,
                };
                dto.CreateDate = DateTime.UtcNow;
                _context.Register.AddRange((IEnumerable<Models.register>)dto);
                _context.SaveChanges();

                response.Result = dto;
                response.Response = "User registered successfully";
                response.ResponseCode = "201"; 
                return response;
            }
            catch (Exception ex)
            {
                response.Result = null;
                response.Response = ex.ToString();
                response.ResponseCode = "500"; 
                return response;
            }
        }

    }
}

