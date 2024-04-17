import "./navbar.scss";
import { Search } from "lucide-react";
import { useState } from "react";
import NavLinksList from "../NavLinksList/NavLinksList";

import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import { useUser } from "../../stores/user.store";
import { Link } from "react-router-dom";
import AnimeService from "../../service/anime.service";

function NavBar() {
    const isAuth = useUser((state) => state.isAuth);
    const [search, setSearch] = useState<string>("");

    const handleSearch = (request: string) => {
        setSearch(request);
        AnimeService.searchAnime(search)
            .then((response) => console.log(response.data.data))
            .catch((err) => console.log(err));
    };

    return isAuth ? (
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

            <NavLinksList />
        </nav>
    ) : (
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
                    setValue={setSearch}
                    type="text"
                    className=""
                    placeholder={`Search`}
                />
            </div>

            <div className="navbar-auth-buttons">
                <Link to={"/login"}>
                    <Button className="w-[100px]">Login</Button>
                </Link>

                <Link to={"/register"}>
                    <Button className="w-[100px]">Register</Button>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;
