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

function NavBar() {
    const isAuth = useUser((state) => state.isAuth);
    const [search, setSearch] = useState<string>("");
    const [result, setResult] = useState();

    const handleSearch = (request: string) => {
        setSearch(request);
        AnimeService.searchAnime(search)
            .then((response) => setResult(response.data.data))
            .catch((err) => console.log(err));
    };

    function setValue(e: any) {
        setSearch(e);
    }

    return (
        <>
            {search.length != 0 && (
                <SearchModal
                    value={search}
                    setValue={setValue}
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
                    <Search width={20} height={20} />
                    <Input
                        value={search}
                        setValue={handleSearch}
                        type="text"
                        className=""
                        placeholder={`Search`}
                    />
                </div>

                {isAuth ? (
                    <NavLinksList />
                ) : (
                    <div className="navbar-auth-buttons">
                        <Link to={"/login"}>
                            <Button className="w-[100px]">Login</Button>
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
