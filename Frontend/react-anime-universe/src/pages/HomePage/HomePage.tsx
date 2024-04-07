import { useEffect, useState } from 'react'
import { AnimeCard } from '../../components/UI/AnimeCard/AnimeCard'
import { IAnime } from '../../models/anime.models'
import AnimeService from '../../service/anime.service'
import { Link } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import './home.scss'

function HomePage() {

    const [anime, setAnime] = useState<IAnime[] | []>([])

    useEffect(() => {
        AnimeService.getFixedAnime(20)
            .then(item => setAnime(item.data))
            .catch(() => new Error("Failed to get data"))

        return () => setAnime([])
    }, [])

    return (
        <>
            <main className="home">

                <div className='home-intro bg-home'>
                    <h1 className='intro-title'>Welcome to this universe</h1>
                    <h2 className='intro-subtitle'>In this place u can just relax</h2>
                </div>

                <section className='anime-section'>
                    {anime.map(el => (
                        <AnimeCard anime={el} key={el.id} />
                    ))}

                    <Link to={'/anime'}>
                        <Button className='anime-button'>Watch all</Button>
                    </Link>
                </section>

            </main>
        </>
    )
}

export default HomePage