import { FC } from "react";
import "./anime-card.scss";

import { AnimeDto } from "../../../models/anime.models";
import { Link } from "react-router-dom";

type ICard = {
    anime: AnimeDto;
};

export const AnimeCard: FC<ICard> = ({ anime }) => {
    return (
        <Link to={`/anime/${anime.id}`} className="card">
            <div>
                <img
                    src={anime.attributes.posterImage.large}
                    width={270}
                    height={250}
                    alt="image"
                />
            </div>

            <div className="card-text-container">
                <h1 className="card-title">
                    {!anime.attributes.titles.en
                        ? anime.attributes.titles.en_jp
                        : anime.attributes.titles.en}
                </h1>
                <p>
                    {anime.attributes.episodeLength} min{" "}
                    {anime.attributes.episodeCount} ep•
                </p>
            </div>
        </Link>
    );
};
