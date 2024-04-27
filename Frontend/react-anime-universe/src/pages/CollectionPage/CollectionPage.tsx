import "./collectionPage.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionsService from "../../service/collections.service";
import { AnimeCard } from "../../components/UI/AnimeCard/AnimeCard";
import { AnimeDto } from "../../models/anime.models";
import {
    CollectionDto,
    SetCollectionDto,
} from "../../models/collections.model";
import NoItems from "../../components/NoItems/NoItems";
import Loading from "../../components/Loading/Loading";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";

function CollectionPage() {
    const { id } = useParams();
    const [anime, setAnime] = useState<AnimeDto[] | []>([]);
    const [col, setCol] = useState<CollectionDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);
    const [newCollection, setNewCollection] = useState<SetCollectionDto>({
        CollectionName: "New name",
        CollectionImage: file,
    });

    useEffect(() => {
        CollectionsService.getCollectionById(id)
            .then((res) => {
                setTimeout(() => {
                    setCol(res.data.data);
                    setAnime(res.data.data.anime);
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });

        return () => {
            setAnime([]);
            setCol(null);
        };
    }, []);

    function handelEdit() {
        setIsEdit((prev) => !prev);
    }

    function setName(name: string) {
        setNewCollection((prev) => ({
            ...prev,
            CollectionName: name,
        }));
    }

    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
    };

    function handleUpdate() {
        if (file) {
            const formData = new FormData();
            formData.append("CollectionImage", file);

            setNewCollection((prev) => ({
                ...prev,
                CollectionImage: formData.get("CollectionImage"),
            }));
        }

        console.log(newCollection);

        CollectionsService.updateCollection(id, newCollection)
            .then((res) => {
                setCol(res.data.data);
            })
            .catch((err) => console.log(err));
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value != "Select anime to remove") {
            const animeId: string = event.target.value;
            console.log(id);
            CollectionsService.deleteAnime(id, animeId)
                .then((res) => console.log(res.data))
                .catch((err) => console.log(err));
        }
    }

    return (
        <>
            <section className="collectionPage-layout">
                {loading && <Loading />}

                {!loading && !anime ? (
                    <NoItems title={`Your ${col?.collectionName} is empty`} />
                ) : (
                    <>
                        <div className="flex flex-row justify-between items-center">
                            {!isEdit ? (
                                <>
                                    <h1 className="collectionPage-title">
                                        {col?.collectionName}
                                    </h1>
                                    <Button onClick={handelEdit} title="Edit" />
                                </>
                            ) : (
                                <>
                                    <Input
                                        type="text"
                                        value={newCollection.CollectionName}
                                        setValue={setName}
                                        placeholder="New collection name"
                                        className="border-solid border-[1px] w-1/6"
                                    />

                                    <input
                                        type="file"
                                        onChange={(e) => getImage(e)}
                                        className="text-sm text-slate-500
                                                file:mr-4 file:py-2 file:px-4 file:rounded-md
                                                file:border-0 file:text-sm file:font-semibold
                                                file:bg-pink-50 file:text-pink-700
                                                hover:file:bg-pink-100"
                                    />

                                    <select
                                        className="text-black rounded-md p-2 w-1/4 bg-yellow-400"
                                        onChange={(e) => handleSelectChange(e)}
                                    >
                                        <option>Select anime to remove</option>
                                        {col?.anime.map((el) => (
                                            <option key={el.id} value={el.id}>
                                                {el.attributes.titles.en_jp}
                                            </option>
                                        ))}
                                    </select>

                                    <div>
                                        <Button
                                            onClick={handleUpdate}
                                            title="Save"
                                        />
                                        <Button
                                            onClick={handelEdit}
                                            title="Cancel"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="collectionPage-list">
                            {anime.map((el) => (
                                <AnimeCard key={el.id} anime={el} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </>
    );
}

export default CollectionPage;
