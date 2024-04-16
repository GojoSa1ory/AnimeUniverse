import { useEffect, useState } from "react";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import AnimeService from "../../service/anime.service";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./home.scss";
import { AnimeDto } from "../../models/anime.models";
import Loading from "../../components/Loading/Loading.tsx";

function HomePage() {
    const [anime, setAnime] = useState<AnimeDto[] | []>([]);

    useEffect(() => {
        AnimeService.getFixedAnime()
            .then((item) => {
                setAnime(item.data.data);
            })
            .catch(() => new Error("Failed to get data"));

        // return () => setAnime([]);
    }, []);

    return (
        <>
            <main className="home">
                <div className="home-intro bg-home">
                    <h1 className="intro-title">Welcome to this universe</h1>
                    <h2 className="intro-subtitle">
                        In this place u can just relax
                    </h2>
                </div>

                {anime
                    ?
                    <section className="anime-section">
                        {anime.map((el) => (
                            <AnimeCard anime={el} key={el.id}/>
                        ))}

                        <Link to={"/anime"}>
                            <Button className="anime-button">Watch all</Button>
                        </Link>
                    </section>
                    :
                    <Loading/>
                }
            </main>
        </>
    );
}

export default HomePage;
