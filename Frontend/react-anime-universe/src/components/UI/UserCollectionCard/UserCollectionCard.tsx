import "./user-collection-card.scss";
import { FC } from "react";
import { CollectionDto } from "../../../models/collections.model";
import { Link } from "react-router-dom";

type IUserCollectionCard = {
    collection: CollectionDto;
};

export const UserCollectionCard: FC<IUserCollectionCard> = ({ collection }) => {
    return (
        <Link
            to={`/user-collections/${collection.id}`}
            className="collection-card"
        >
            <div>
                <img
                    // src="https://i.pinimg.com/originals/61/a2/fd/61a2fd1524811daa39de174c049e64e5.gif"
                    src={
                        collection.collectionImage == "string"
                            ? "https://i.pinimg.com/originals/61/a2/fd/61a2fd1524811daa39de174c049e64e5.gif"
                            : collection.collectionImage
                    }
                    alt="image"
                    className="h-[220px] w-[300px] flex"
                />
            </div>

            <div className="collection-card-content">
                <p className="overflow-hidden text-ellipsis">
                    {collection.collectionName}
                </p>
            </div>
        </Link>
    );
};
