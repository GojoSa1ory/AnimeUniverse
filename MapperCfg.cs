using AutoMapper;
namespace RSPOCourseWork;

public class MapperCfg : Profile
{
    public MapperCfg()
    {
        //User models/dtos configuration
        CreateMap<GetUserDto, SetUserDto>();
        CreateMap<SetUserDto, GetUserDto>();
        
        CreateMap<GetUserDto, UserModel>();
        CreateMap<SetUserDto, UserModel>();
        CreateMap<UserModel, GetUserDto>();
        CreateMap<UserModel, SetUserDto>();
        
        //Anime configuration
        CreateMap<AnimeModel, Datum>();
        CreateMap<AttributesModel, Attributes>();
        CreateMap<LinksModel, Links>();
        CreateMap<TitlesModel, Titles>();
        CreateMap<PosterImageModel, PosterImage>();
        CreateMap<CoverImageModel, CoverImage>();
        
        CreateMap<Datum, AnimeModel>();
        CreateMap<Attributes, AttributesModel>();
        CreateMap<Links, LinksModel>();
        CreateMap<Titles, TitlesModel>();
        CreateMap<PosterImage, PosterImageModel>();
        CreateMap<CoverImage, CoverImageModel>();
        
        CreateMap<AnimeModel, AnimeDto>();
        CreateMap<AttributesModel, AttributesDto>();
        CreateMap<LinksModel, LinksDto>();
        CreateMap<TitlesModel, TitlesDto>();
        CreateMap<PosterImageModel, PosterImageDto>();
        CreateMap<CoverImageModel, CoverImageDto>();
        
        //Collection configuration
        CreateMap<GetCollectionDto, SetCollectionDto>();
        CreateMap<SetCollectionDto, GetCollectionDto>();
        CreateMap<GetCollectionDto, CollectionModel>();
        CreateMap<SetCollectionDto, CollectionModel>();
        CreateMap<CollectionModel, SetCollectionDto>();
        CreateMap<CollectionModel, GetCollectionDto>();
    }
}

