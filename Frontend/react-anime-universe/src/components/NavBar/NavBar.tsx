import "./navbar.scss";
import { Search } from "lucide-react";
import { useState } from "react";
import NavLinksList from "../NavLinksList/NavLinksList";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import { useUser } from "../../stores/user.store";
import { Link } from "react-router-dom";
import AnimeService from "../../service/anime.service";
import { SearchModal } from "../UI/SearchModal/SearchModal";
import { AnimeDto } from "../../models/anime.models";

function NavBar() {
    const isAuth = useUser((state) => state.isAuth);
    const [search, setSearch] = useState<string>("");
    const [result, setResult] = useState<AnimeDto[] | []>([]);
    const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);

    const handleSearch = (request: string) => {
        setSearch(request);
        setOpenSearchModal(true)
        AnimeService.searchAnime(search)
            .then((response) => setResult(response.data.data))
            .catch((err) => console.log(err));
    };

    function closeModal () {
        setOpenSearchModal(false)
    }

    return (
        <>
            {openSearchModal && (
                <SearchModal
                    value={search}
                    setValue={handleSearch}
                    setCloseModal={closeModal}
                    result={result}
                />
            )}

            <nav className="navbar-container">
                <Link to={"/"} className="navbar-logo">
                    <button className="navbar-button">
                        <h1>Anime Universe </h1>
                        <img src="/images/footer/footer.gif" />
                    </button>
                </Link>

                <div className="navbar-search-container">
                    <Search onClick={() => setOpenSearchModal(true)} width={20} height={20} />
                    <Input
                        value={search}
                        setValue={handleSearch}
                        type="text"
                        className="navbar-search-input"
                        placeholder={`Search`}
                    />
                </div>

                {isAuth ? (
                    <NavLinksList />
                ) : (
                    <div className="navbar-auth-buttons">
                        <Link to={"/anime"}>
                            <Button className="w-[100px]">Anime</Button>
                        </Link>

                        <Link to={"/login"}>
                            <Button className="w-[100px] mx-2">Login</Button>
                        </Link>

                        <Link to={"/register"}>
                            <Button className="w-[100px]">Register</Button>
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
}

export default NavBar;
