import { useEffect, useState } from "react"
import "./ProfileCollections.scss"
import CollectionsService from "../../service/collections.service"
import { UserCollectionCard } from "../UI/UserCollectionCard/UserCollectionCard"
import { IUserCollection } from "../../models/collections.model"

function ProfileCollections() {

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

        return () => setCollections([])
    }, [])

    return (
        <div className="profile-collections-layout">
            <ul className="profile-collectionsPage-list">
                {collections?.map(el => (
                    <UserCollectionCard collection={el} key={el.id} />
                ))}
            </ul>
        </div>
    )
}

export default ProfileCollections