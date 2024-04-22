import { Link } from "react-router-dom";
import { AnimeDto } from "../../../models/anime.models";

export const SearchCard = ({ result }: { result: AnimeDto }) => {
    return (
        <>
            <Link
                to={`./anime/${result.id}`}
                className="flex w-full flex-row justify-between items-center p-4 rounded-md hover:bg-gray-700"
            >
                <img
                    src={result.attributes.posterImage.tiny}
                    width={90}
                    alt="anime"
                />
                <div className="w-1/2 flex flex-col justify-end items-end">
                    <p>{result.attributes.titles.en_jp}</p>
                    <p>Age rating: {result.attributes.ageRating}</p>
                    <p>Episode count: {result.attributes.episodeCount}</p>
                </div>
            </Link>
        </>
    );
};
