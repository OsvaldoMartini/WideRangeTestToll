using System;

namespace Domain
{
    public class UserMarca
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public Guid MarcaId { get; set; }
        public virtual Marca Marca { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}