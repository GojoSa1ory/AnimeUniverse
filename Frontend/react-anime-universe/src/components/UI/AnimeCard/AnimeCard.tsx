import { FC } from 'react'
import './anime-card.scss'

import { IAnime } from '../../../models/anime.models'
import { Link } from 'react-router-dom'

type ICard = {
    anime: IAnime
}

export const AnimeCard: FC<ICard> = ({ anime }) => {
    return (
        <Link 
        to={`/anime/${anime.id}`} 
        className='card'>
            <div>
                <img src={anime.posterImage.large} width={270} height={250} alt='image' />
            </div>

            <div className='card-text-container'>
                <h1 className='card-title'>{!anime.titles.en ? anime.titles.en_jp : anime.titles.en}</h1>
                <p>{anime.episodeLength} min {anime.episodeCount} ep•</p>
            </div>
            
        </Link>
    )
}