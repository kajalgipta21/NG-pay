using Microsoft.AspNetCore.Mvc;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;

namespace SKYTM_VTP.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class Login : Controller
    {
        private readonly AppDbContext _context;


        public Login(AppDbContext context)
        {
            _context = context;
        }



        public string PhoneNumber { get; internal set; }
        public string Password { get; internal set; }
        [HttpPost("login")]
        public ApiResponse LoginUser([FromBody] Logindto dto)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var user = _context.Register.FirstOrDefault(u => u.PhoneNumber == dto.PhoneNumber && u.Password == dto.Password);
                if (user == null)
                {
                    response.Result = null;
                    response.Response = "Invalid phone number or password";
                    response.ResponseCode = "401"; 
                    return response;
                }
                response.Result = user;
                response.Response = "Login successful";
                response.ResponseCode = "200"; 
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