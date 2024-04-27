import Input from "../Input/Input";
import "./SearchModal.scss";
import { AnimeDto } from "../../../models/anime.models";
import { SearchCard } from "../SearchCard/SearchCard";
import {FC} from "react";


type ISearchModal = {
    value: string,
    setValue(e: string): void,
    result: AnimeDto[] | [],
    setCloseModal(): void

}

export const SearchModal:FC<ISearchModal> = (props) => {
    return (
        <>
            <button onClick={() => props.setCloseModal()} className="darkbg" />
            <dialog
                open
                className="search-collection-dialog overflow-y-auto overflow-hidden"
            >
                <Input
                    placeholder="Enter collection name"
                    setValue={props.setValue}
                    value={props.value}
                    type="text"
                    className="fixed z-2 h-16 w-[90%] text-white bg-black"
                />

                <ul className="mt-20 grid grid-cols-1 gap-5 z-1 pt-20">
                    {props.result?.map((item) => (
                        <button key={item.id} onClick={() => props.setCloseModal()}>
                            <SearchCard result={item} />
                        </button>
                    ))}
                </ul>
            </dialog>
        </>
    );
};
