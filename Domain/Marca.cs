using System;
using System.Collections.Generic;

namespace Domain
{
    public class Marca
    {

        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public string ProcessoNumber { get; set; }
        public string Procurador { get; set; }
        public string Proprietario { get; set; }

        public virtual ICollection<UserMarca> UserMarcas { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}