import "./collectionsPage.scss";
import { useEffect, useState } from "react";
import CollectionsService from "../../service/collections.service";
import { CollectionDto } from "../../models/collections.model";
import { UserCollectionCard } from "../../components/UI/UserCollectionCard/UserCollectionCard";
import NoItems from "../../components/NoItems/NoItems.tsx";
import Loading from "../../components/Loading/Loading.tsx";

function CollectionsPage() {
    const [collections, setCollections] = useState<CollectionDto[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        try {
            CollectionsService.getAllCollections()
                .then((res) => {
                    setTimeout(() => {
                        setCollections(res.data.data);
                        setLoading(false);
                    }, 1000);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    return (
        <section className="collectionsPage-layout">
            <h1>Your collections</h1>

            {loading && <Loading />}

            {!loading && !collections && (
                <NoItems title={"Your collections is empty"} />
            )}

            <section className="collectionsPage-list">
                {collections?.map((el) => (
                    <UserCollectionCard collection={el} key={el.id} />
                ))}
            </section>
        </section>
    );
}

export default CollectionsPage;
