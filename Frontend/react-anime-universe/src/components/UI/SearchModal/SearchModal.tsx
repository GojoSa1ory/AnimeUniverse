import Input from "../Input/Input";
import "./SearchModal.scss";
import { AnimeDto } from "../../../models/anime.models";
import { SearchCard } from "../SearchCard/SearchCard";

export const SearchModal = ({
    value,
    setValue,
    result,
}: {
    value: string;
    setValue(e: any): void;
    result: AnimeDto[];
}) => {
    return (
        <>
            <button onClick={() => setValue("")} className="darkbg" />
            <dialog
                open
                className="search-collection-dialog overflow-y-auto overflow-hidden"
            >
                <Input
                    placeholder="Enter collection name"
                    setValue={setValue}
                    value={value}
                    type="text"
                    className="fixed z-2 h-16 w-[90%] text-white bg-black"
                />

                <ul className="mt-20 grid grid-cols-1 gap-5 z-1 pt-20">
                    {result?.map((item) => (
                        <button key={item.id} onClick={() => setValue("")}>
                            <SearchCard result={item} />
                        </button>
                    ))}
                </ul>
            </dialog>
        </>
    );
};
