import "./collectionPage.scss"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import CollectionsService from "../../service/collections.service"
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard"
import { IAnime } from "../../models/anime.models"
import { IUserCollection } from "../../models/collections.model"
import NoItems from "../../components/NoItems/NoItems"

function CollectionPage() {

    const { id } = useParams()
    const [anime, setAnime] = useState<IAnime[] | []>([])
    const [col, setCol] = useState<IUserCollection | null>(null)

    useEffect(() => {

        CollectionsService.getCollectionById(id)
            .then((res) => {
                setCol(res.data)
                setAnime(res.data.anime)
            })
            .catch()

        return () => {
            setAnime([])
            setCol(null)
        }
    }, [])


    return (
        <>
            <section className='collectionPage-layout'>
                <h1 className="collectionPage-title">{col?.title}</h1>

                {anime.length === 0 ? <NoItems title={`Your ${col?.title} is empty`} /> :

                    <div className="collectionPage-list">
                        {/* TODO: Create a useful anime list component */}
                        {anime.map(el => (
                            <AnimeCard key={el.id} anime={el} />
                        ))}
                    </div>

                }


            </section>
        </>
    )
}

export default CollectionPage