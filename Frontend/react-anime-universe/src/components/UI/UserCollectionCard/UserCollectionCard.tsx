import './user-collection-card.scss'


import { FC } from "react"
import { IUserCollection } from '../../../models/collections.model'
import { Link } from 'react-router-dom'


type IUserCollectionCard = {
    collection: IUserCollection
}

export const UserCollectionCard: FC<IUserCollectionCard> = ({collection}) => {
  return (
    <Link to={`/user-collections/${collection.id}`} className='collection-card'>

            <div>
                <img src='https://i.pinimg.com/originals/61/a2/fd/61a2fd1524811daa39de174c049e64e5.gif' alt='image' />
            </div>

            <div className='collection-card-content'>
                <p className='overflow-hidden text-ellipsis'>{collection.title}</p>
                {/* <p className='text-zinc-500'>{anime.episodeLength} min {anime.episodeCount} ep•</p> */}
            </div>
            
    </Link>
  )
}
