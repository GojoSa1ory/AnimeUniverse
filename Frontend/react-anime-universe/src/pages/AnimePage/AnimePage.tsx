import "./animePage.scss";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimeDto } from "../../models/anime.models";
import AnimeService from "../../service/anime.service";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import CollectionsService from "../../service/collections.service";
import { IUserCollection } from "../../models/collections.model";
import CreateCollectionModal from "../../components/UI/CreateCollectionModal/CreateCollectionModal";
import { CommentModel, SetCommentModel } from "../../models/comment.model";
import { CommentView } from "../../components/UI/Comments/CommentView";
import Button from "../../components/UI/Button/Button";
import {ServerResponse} from "../../models/serverResponse.models.ts";
import NoItems from "../../components/NoItems/NoItems.tsx";
import {CommentService} from "../../service/comment.service.ts";

function AnimePage() {
    const { id } = useParams();

    const [isHovered, setIsHovered] = useState(false);
    const [anime, setAnime] = useState<AnimeDto | null>(null);
    const [comments, setComments] = useState<ServerResponse<CommentModel[]> | undefined>()
    const [collections, setCollections] = useState<IUserCollection[] | []>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [commentText, setCommentText] = useState<string | null>("");

    useEffect(() => {
        AnimeService.getAnimeById(id)
            .then((item) => setAnime(item.data.data))
            .catch((err) => console.error(err));
        
        CollectionsService.getAllCollections()
            .then((res) => setCollections(res.data))
            .catch((err) => console.log(err));
        
        CommentService.getComments(id)
            .then((data) => { setComments(data.data); console.log(data.data) })
            .catch((err: ServerResponse<CommentModel[]>) => setComments(err))
        
        return () => {
            setAnime(null);
            setCollections([]);
        };
    }, []);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        if (event.target.value === "Create collection") {
            setOpen(true);
        } else {
            const id: string = event.target.value;
            CollectionsService.addAnimeToCollection(id, anime?.id)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        }
    };

    const closeModal = () => {
        setOpen(false);
    };

    if (!anime) {
        return <Loading />;
    }

    const handleSendComment = () => {
        const comment: SetCommentModel = {
            text: commentText!,
            name: "string"
        }

        CommentService.sendComment(id, comment)
            .then(data => {
                console.log(data.data.data)
                setComments(prevComments => ({
                    ...prevComments,
                    data: prevComments?.data ? [...prevComments.data, data.data.data] : [data.data.data],
                    success: true,
                    message: prevComments?.message || '',
                }))
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            {open && <CreateCollectionModal setIsOpen={closeModal} />}

            <Helmet
                title={`${anime.attributes.titles.en_jp}`}
                meta={[
                    {
                        name: "description",
                        content: `Page of ${anime.attributes.titles.en_jp} anime`,
                    },
                    { property: "og:type", content: "article" },
                ]}
            />

            <section className="animePageLayout">
                <div className="animePage-intro">
                    <div className="animePage-anime-intro">
                        <img
                            className="animePage-anime-poster"
                            width={350}
                            height={350}
                            alt="poster"
                            src={anime.attributes.posterImage.large}
                        />

                        <div className="flex flex-col justify-center items-center w-full my-4">
                            <button className="animePage-button">
                                Write a comment
                            </button>

                            <select
                                className="animePage-section"
                                onChange={(e) => handleSelectChange(e)}
                            >
                                <option value={0}>+Add to collection</option>
                                {collections.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.title}
                                    </option>
                                ))}
                                <option>Create collection</option>
                            </select>
                        </div>
                    </div>

                    <div className="animePage-anime-stats-container">
                        <div
                            className="animePage-start-container"
                            onMouseLeave={handleMouseLeave}
                        >
                            <Star color="#ffc800" size={30} />
                            <p className="animePage-anime-rating">
                                {parseFloat(
                                    anime.attributes.averageRating,
                                ).toFixed(0)}
                                /100
                            </p>

                            <div
                                className={`animePage-start`}
                                onMouseEnter={handleMouseEnter}
                            >
                                <Star className="mr-3 " size={30} />
                                <p className="text-xs">
                                    Rating <br /> anime
                                </p>
                            </div>

                            {isHovered && (
                                <div className="animePage-stars-container">
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

                        <div className="animePage-anime-titles">
                            <p>{anime.attributes.titles.en_jp}</p>
                            <p>{anime.attributes.titles.ja_jp}</p>
                        </div>

                        <div className="animePage-anime-status">
                            <p>Anime status: {anime.attributes.status}</p>
                        </div>

                        <div className="animePage-anime-info-container">
                            <div className="animePage-anime-info">
                                <p className="animePage-anime-info-text">
                                    Type
                                </p>
                                <p className="animePage-anime-info-text">
                                    Episodes count
                                </p>
                                <p className="animePage-anime-info-text">
                                    Started at
                                </p>
                                <p className="animePage-anime-info-text">
                                    Ended at
                                </p>
                                <p className="animePage-anime-info-text">
                                    Age rating
                                </p>
                                <p className="animePage-anime-info-text">
                                    Episode length
                                </p>
                                <p className="animePage-anime-info-text">
                                    Total length
                                </p>
                            </div>
                            <div className="animePage-anime-info">
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.showType}
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.episodeCount}
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.startDate}
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.endDate}
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.ageRating}
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.episodeLength} min
                                </p>
                                <p className="animePage-anime-info-text">
                                    {anime.attributes.totalLength} min
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animePage-descriptions">
                    <div className="flex text-gray-400 text-xl bg-zinc-900 p-4 rounded-md">
                        <p>{anime.attributes.description}</p>
                    </div>
                </div>

                <div className="animePage-video-section">
                    {/* <img src={anime.data.attributes.coverImage.original}></img> */}
                    <iframe
                        className="animePage-video"
                        src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />

                    <div className="animePage-episodes bg-main-bg">
                        {anime.attributes.showType}
                    </div>
                </div>

                <div className="m-14 flex flex-col justify-center items-end h-[200px]">
                    <textarea
                        placeholder="Ur text"
                        value={commentText!}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full h-48 mb-5 p-2 resize-none border rounded border-none outline-none bg-zinc-900"
                    />
                    <Button title="Send" className="w-1/5" onClick={(e) => handleSendComment()}/>
                </div>

                <div className="animePage-comments-container">
                    
                    {comments?.message &&
                        <NoItems title={"No comments"}/>
                    }
                    
                    {comments?.success === true && !comments.data &&
                        <Loading/>
                    }
                    
                    {comments?.data &&
                        <ul>
                            {comments?.data.map((c: CommentModel) => (
                                <CommentView key={c.id} comments={c}/>
                            ))}
                        </ul>
                    }
                    
                </div>
            </section>
        </>
    );
}

export default AnimePage;
