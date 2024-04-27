import "./createCollections.scss";
import { useState } from "react";
import Input from "../Input/Input";

import Button from "../Button/Button";
import CollectionsService from "../../../service/collections.service";
import { SetCollectionDto } from "../../../models/collections.model";

function CreateCollectionModal({
    setIsOpen,
    id,
}: {
    setIsOpen(): void;
    id: string | undefined;
}) {
    const [collectionName, setCollectionName] = useState<string>("");

    const createCollection = async () => {
        const collection: SetCollectionDto = {
            CollectionName: collectionName,
            AnimeId: parseInt(id),
            CollectionImage: "string",
        };

        CollectionsService.createCollection(collection)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
                setIsOpen();
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div onClick={setIsOpen} className="darkbg" />

            <dialog open className="create-collection-dialog">
                <h1 className="create-collection-title">
                    Create new collection
                </h1>

                <Input
                    placeholder="Enter collection name"
                    setValue={setCollectionName}
                    value={collectionName}
                    type="text"
                    className="text-white bg-black"
                />

                <Button onClick={createCollection} className="w-1/2 my-3">
                    Create
                </Button>
            </dialog>
        </>
    );
}

export default CreateCollectionModal;
