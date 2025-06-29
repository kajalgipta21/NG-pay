using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SKYTM_VTP.Dto;

namespace SKYTM_VTP.Dto
{
    public class ApiResponse
    {
        public object Result { get; internal set; }
        public string ResponseCode { get; internal set; }
        public string Response { get; internal set; }
    }
}