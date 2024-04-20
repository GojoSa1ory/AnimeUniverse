import "./collectionsPage.scss";
import { useEffect, useState } from "react";
import CollectionsService from "../../service/collections.service";
import { CollectionDto } from "../../models/collections.model";
import { UserCollectionCard } from "../../components/UI/UserCollectionCard/UserCollectionCard";
import NoItems from "../../components/NoItems/NoItems.tsx";

function CollectionsPage() {
    const [collections, setCollections] = useState<CollectionDto[]>();

    useEffect(() => {
        try {
            CollectionsService.getAllCollections()
                .then((res) => setCollections(res.data.data))
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <section className="collectionsPage-layout">
            <h1>Your collections</h1>

            {!collections && <NoItems title={"U don't have any collections"} />}

            <section className="collectionsPage-list">
                {collections?.map((el) => (
                    <UserCollectionCard collection={el} key={el.id} />
                ))}
            </section>
        </section>
    );
}

export default CollectionsPage;
