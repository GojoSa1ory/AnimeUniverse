import { useEffect, useState } from "react";
import { AnimeDto } from "../../models/anime.models";
import AnimeService from "../../service/anime.service";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import Button from "../../components/UI/Button/Button";
import NotFound from "../../components/NotFound/NotFound";
import Loading from "../../components/Loading/Loading";

export const AllAnimePage = () => {
    const [anime, setAnime] = useState<AnimeDto[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        AnimeService.paginationAnime(page)
            .then((res) => {
                setAnime(res.data.data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    }, [page]);

    return (
        <>
            <div className="flex flex-col justify-center items-center p-10 bg-zinc-900">
                {loading && <Loading />}

                {anime.length === 0 && <NotFound />}

                <div className="grid grid-cols-5 gap-5">
                    {anime.map((e) => (
                        <AnimeCard key={e.id} anime={e} />
                    ))}
                </div>

                <div className="mt-5 flex flex-row">
                    <Button
                        className="mr-5"
                        onClick={() => {
                            if (page === 1) setPage(1);
                            else setPage((prev) => prev - 1);
                        }}
                        title="Perv page"
                    />
                    <Button
                        onClick={() => setPage((prev) => prev + 1)}
                        title="Next page"
                    />
                </div>
            </div>
        </>
    );
};
