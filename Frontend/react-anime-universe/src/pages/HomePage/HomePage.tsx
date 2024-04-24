import { useEffect, useState } from "react";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import AnimeService from "../../service/anime.service";
import { Link } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import "./home.scss";
import { AnimeDto } from "../../models/anime.models";
import Loading from "../../components/Loading/Loading.tsx";
import NoItems from "../../components/NoItems/NoItems.tsx";

function HomePage() {
    const [anime, setAnime] = useState<AnimeDto[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AnimeService.paginationAnime(1)
            .then((item) => {
                setTimeout(() => {
                    setAnime(item.data.data);
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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

                {loading && <Loading />}

                {!loading && !anime && <NoItems title="Error" />}

                {anime && (
                    <section className="anime-section">
                        {anime.map((el) => (
                            <AnimeCard anime={el} key={el.id} />
                        ))}

                        <Link to={"/anime"}>
                            <Button className="anime-button">Watch all</Button>
                        </Link>
                    </section>
                )}
            </main>
        </>
    );
}

export default HomePage;
