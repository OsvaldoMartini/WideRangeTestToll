using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Marcas
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Marca, MarcaDto>();
            CreateMap<UserMarca, AttendeeDto>()
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}