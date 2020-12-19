using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.demo.Models
{
    public class User
    {
        public long Id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string username { get; set; }
        public string password { get; set; }
    }
}
