import "./collectionPage.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionsService from "../../service/collections.service";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import { AnimeDto } from "../../models/anime.models";
import { CollectionDto } from "../../models/collections.model";
import NoItems from "../../components/NoItems/NoItems";
import Loading from "../../components/Loading/Loading";

function CollectionPage() {
    const { id } = useParams();
    const [anime, setAnime] = useState<AnimeDto[] | []>([]);
    const [col, setCol] = useState<CollectionDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        CollectionsService.getCollectionById(id)
            .then((res) => {
                setTimeout(() => {
                    setCol(res.data.data);
                    setAnime(res.data.data.anime);
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        return () => {
            setAnime([]);
            setCol(null);
        };
    }, []);

    return (
        <>
            <section className="collectionPage-layout">
                <h1 className="collectionPage-title">{col?.collectionName}</h1>

                {loading && <Loading />}

                {!loading && !anime ? (
                    <NoItems title={`Your ${col?.collectionName} is empty`} />
                ) : (
                    <div className="collectionPage-list">
                        {anime.map((el) => (
                            <AnimeCard key={el.id} anime={el} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default CollectionPage;
