import { useState } from "react";
import { useUser } from "../../stores/user.store";
import "./profilePage.scss";
import ProfileIntro from "../../components/ProfileIntro/ProfileIntro";
import ProfileSettings from "../../components/ProfileSettings/ProfileSettings";
import ProfileCollections from "../../components/ProfileCollections/ProfileCollections";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    //TODO: Create a header profile image
    const user = useUser((state) => state.user);
    const [choose, setChoose] = useState<string>("start");
    const navigate = useNavigate();

    const checkImage = () => {
        return user?.profileImage === null
            ? "../public/bg.jpg"
            : user?.profileImage;
    };

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    };

    const renderSwitch = (): React.ReactNode => {
        switch (choose) {
            case "start":
                return <ProfileIntro />;
            case "settings":
                return <ProfileSettings />;
            case "collections":
                return <ProfileCollections />;
        }
    };

    return (
        <>
            <section className="profile-layout">
                <div className="profile-nav-panle">
                    <div className="profile-info">
                        <img src={checkImage()} className="user-image" />
                        <p>{user?.name}</p>
                    </div>

                    <div className="profile-nav-links">
                        <ul>
                            <li
                                onClick={() => setChoose("settings")}
                                className="profile-nav-link"
                            >
                                Settings
                            </li>
                            <li
                                onClick={() => setChoose("collections")}
                                className="profile-nav-link"
                            >
                                Collections
                            </li>
                            <li
                                onClick={() => setChoose("favorites")}
                                className="profile-nav-link"
                            >
                                Favorites
                            </li>
                            <li onClick={logOut} className="profile-nav-link">
                                Log Out
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="profile-main">{renderSwitch()}</div>
            </section>
        </>
    );
};
