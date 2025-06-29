using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SKYTM_VTP.Data;
using SKYTM_VTP.Dto;

namespace SKYTM_VTP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class User : Controller
    {
        private readonly AppDbContext _context;


        public User(AppDbContext context)
        {
            _context = context;
        }

        public object Username { get; internal set; }
        public string Email { get; internal set; }
        public string PhoneNumber { get; internal set; }
        public string Gender { get; internal set; }
        public object Password { get; internal set; }
        public string ImageUrl { get; internal set; }
        public int Amount { get; internal set; }
        public bool IsAdmin { get; internal set; }

        [HttpGet("all")]
        public ApiResponse GetAllUsers(string phoneNumber)
        {
            ApiResponse response = new ApiResponse();
            try
            {
                var user = _context.Registeruser.FirstOrDefault(u => u.PhoneNumber == phoneNumber);
                if (user == null||user.IsAdmin == false)
                {
                    response.Result = null;
                    response.Response = "Only admin can access this";
                    response.ResponseCode = "481";
                    return response ;


                }
                else
                {
                    response.Result = user;
                    response.Response = "Users fetched successfully";
                    response.ResponseCode = "200";
                    return response;

                }

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