import "./animePage.scss"
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { IAnime } from '../../models/anime.models';
import AnimeService from '../../service/anime.service';
import Loading from '../../components/Loading/Loading';
import { Helmet } from "react-helmet-async";
import CollectionsService from '../../service/collections.service';
import { IUserCollection } from '../../models/collections.model';
import CreateCollectionModal from '../../components/UI/CreateCollectionModal/CreateCollectionModal';


function AnimePage() {

    const { id } = useParams()

    const [isHovered, setIsHovered] = useState(false)
    const [anime, setAnime] = useState<IAnime | null>(null);
    const [collections, setCollections] = useState<IUserCollection[] | []>([])
    const [open, setOpen] = useState<boolean>(false)


    useEffect(() => {

        AnimeService.getAnimeById(id)
            .then(item => setAnime(item.data))
            .catch(err => console.error(err))
        CollectionsService.getAllCollections()
            .then(res => setCollections(res.data))
            .catch(err => console.log(err))

        return () => {
            setAnime(null)
            setCollections([])
        }

    }, [])

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        if (event.target.value === "Create collection") {
            setOpen(true)
        } else {
            const id: string = event.target.value
            CollectionsService.addAnimeToCollection(id, anime?.id)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        }

    };

    const closeModal = () => {
        setOpen(false)
    }

    if (!anime) {
        return <Loading />
    }

    return (
        <>

            {open && <CreateCollectionModal setIsOpen={closeModal} />}

            <Helmet
                title={`${anime.titles.en_jp}`}
                meta={[
                    { "name": "description", "content": `Page of ${anime.titles.en_jp} anime` },
                    { "property": "og:type", "content": "article" }
                ]}

            />

            <section className='animePageLayout'>

                <div className='animePage-intro'>

                    <div className='animePage-anime-intro'>

                        <img className="animePage-anime-poster" 
                            width={350} 
                            height={350} 
                            alt='poster' 
                            src={anime.posterImage.large} 
                        />

                        <div className='flex flex-col justify-center items-center w-full my-4'>

                            <button className='animePage-button'>Write a comment</button>

                            <select
                                className='animePage-section'
                                onChange={e => handleSelectChange(e)}
                            >
                                <option value={0}>+Add to collection</option>
                                {collections.map(el => (
                                    <option key={el.id} value={el.id}>{el.title}</option>
                                ))}
                                <option>Create collection</option>
                            </select>
                        </div>

                    </div>

                    <div className='animePage-anime-stats-container'>
                        
                        <div
                            className='animePage-start-container'
                            onMouseLeave={handleMouseLeave}
                        >
                            <Star color='#ffc800' size={30} />
                            <p className='animePage-anime-rating'>
                                {parseFloat(anime.averageRating).toFixed(0)}/100
                            </p>

                            <div 
                            className={`animePage-start`} 
                            onMouseEnter={handleMouseEnter}>
                                <Star className='mr-3 ' size={30} />
                                <p className='text-xs'>
                                    Rating <br /> anime
                                </p>
                            </div>

                            {isHovered && (
                                <div className='animePage-stars-container' >
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                    <Star size={30} />
                                </div>
                            )}

                        </div>

                        <div className='animePage-anime-titles'>
                            <p>{anime.titles.en_jp}</p>
                            <p>{anime.titles.ja_jp}</p>
                        </div>

                        <div className='animePage-anime-status'>
                            <p>Anime status: {anime.status}</p>
                        </div>

                        <div className='animePage-anime-info-container'>
                            <div className='animePage-anime-info'>
                                <p className='animePage-anime-info-text'>Type</p>
                                <p className='animePage-anime-info-text'>Episodes count</p>
                                <p className='animePage-anime-info-text'>Started at</p>
                                <p className='animePage-anime-info-text'>Ended at</p>
                                <p className='animePage-anime-info-text'>Age rating</p>
                                <p className='animePage-anime-info-text'>Episode length</p>
                                <p className='animePage-anime-info-text'>Total length</p>
                            </div>
                            <div className='animePage-anime-info'>
                                <p className='animePage-anime-info-text'>{anime.showType}</p>
                                <p className='animePage-anime-info-text'>{anime.episodeCount}</p>
                                <p className='animePage-anime-info-text'>{anime.startDate}</p>
                                <p className='animePage-anime-info-text'>{anime.endDate}</p>
                                <p className='animePage-anime-info-text'>{anime.ageRating}</p>
                                <p className='animePage-anime-info-text'>{anime.episodeLength} min</p>
                                <p className='animePage-anime-info-text'>{anime.totalLength} min</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='animePage-descriptions'>
                    <div className='flex text-gray-400 text-xl bg-zinc-900 p-4 rounded-md'>
                        <p>{anime.description}</p>
                    </div>
                </div>


                <div className='animePage-video-section'>
                    {/* <img src={anime.data.attributes.coverImage.original}></img> */}
                    <iframe
                        className='animePage-video'
                        src={`https://www.youtube.com/embed/${anime.youtubeVideoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />

                    <div className='animePage-episodes bg-main-bg'>
                        {anime.showType}
                    </div>
                </div>

            </section>
        </>

    )
}

export default AnimePage