import "./collectionsPage.scss"
import { useEffect, useState } from 'react'
import CollectionsService from '../../service/collections.service'
import { IUserCollection } from '../../models/collections.model'
import { UserCollectionCard } from '../../components/UI/UserCollectionCard/UserCollectionCard'

function CollectionsPage() {

    const [collections, setCollections] = useState<IUserCollection[]>()

    useEffect(() => {
        try {
            CollectionsService.getAllCollections()
            //@ts-ignore
            .then(res => setCollections(res.data))
            .catch(err => console.log(err))
        } catch (error) {
            console.log(error)
        }
    },[])

  return (

    <section className='collectionsPage-layout'>

        <h1>Your collections</h1>

        <section className='collectionsPage-list'>

            {collections?.map(el => (
                <UserCollectionCard collection={el} key={el.id}/>
            ))}

        </section>
    </section>
    
  )
}

export default CollectionsPage