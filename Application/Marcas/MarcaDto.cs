using System;
using System.Collections.Generic;
using Application.Comments;
using Newtonsoft.Json;

namespace Application.Marcas
{
    public class MarcaDto
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

        [JsonProperty("attendees")]
        public ICollection<AttendeeDto> UserMarcas { get; set; }
        public ICollection<CommentDto> Comments { get; set; }
    }
}