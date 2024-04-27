import { useEffect, useState } from "react";
import { AnimeDto } from "../../models/anime.models";
import AnimeService from "../../service/anime.service";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import Button from "../../components/UI/Button/Button";
import NotFound from "../../components/NotFound/NotFound";
import Loading from "../../components/Loading/Loading";
import { filterMethods } from "../../constants/FilterMethods";
import "./AllAnimePage.style.scss"

export const AllAnimePage = () => {

    const [anime, setAnime] = useState<AnimeDto[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [method, setMethod] = useState<string>("none");

    useEffect(() => {
        if (method === "none") {
            AnimeService.paginationAnime(page)
                .then((res) => {
                    setAnime(res.data.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            AnimeService.filterAnime(method, page)
                .then((res) => setAnime(res.data.data))
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [page, method]);

    const handleSelectChange: (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => void = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setMethod(filterMethods[parseInt(event.target.value)]);
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center p-10 bg-zinc-900">
                {loading && <Loading />}

                {anime.length === 0 && <NotFound />}
                <select
                    className="animePage-section"
                    onChange={(e) => handleSelectChange(e)}
                >
                    <option value={0}>None</option>
                    <option value={1}>byPopularityRank</option>
                    <option value={2}>byEpisodeCount</option>
                    <option value={3}>byAverageRating</option>
                </select>

                <div className="anime-list-container">
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
