import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

import AnimePage from "./pages/AnimePage/AnimePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegPage from "./pages/RegistrationPage/RegPage";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NotFound from "./components/NotFound/NotFound";
import AuthService from "./service/auth.service";
import { useEffect } from "react";
import { useUser } from "./stores/user.store";
import CollectionsPage from "./pages/CollectionsPage/CollectionsPage";
import AuthGuard from "./guards/AuthGuard";
import CollectionPage from "./pages/CollectionPage/CollectionPage";
import { ProfilePage } from "./pages/ProfilePage/ProfilePage";
import MainLayout from "./components/Layouts/MainLayout";

function App() {
    const setUser = useUser((state) => state.setUser);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                //TODO: Remake checkAuth function

                AuthService.checkAuth()
                    .then((res) => {
                        AuthService.getUser(res.data.data.id)
                            .then((user) => setUser(user.data))
                            .catch((err) => console.log(err));
                    })
                    .catch((error) => {
                        localStorage.removeItem("token");
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <HelmetProvider>
                <Helmet
                    defaultTitle="AnimeUniverse"
                    meta={[
                        {
                            name: "description",
                            content: "Web site for watch anime",
                        },
                        { property: "og:type", content: "article" },
                    ]}
                />

                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index path="/" element={<HomePage />} />
                        <Route path="anime/:id" element={<AnimePage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegPage />} />

                        {/* Private Routes */}
                        <Route element={<AuthGuard />}>
                            <Route
                                path="user-collections"
                                element={<CollectionsPage />}
                            />
                            <Route
                                path="user-collections/:id"
                                element={<CollectionPage />}
                            />
                            <Route path="profile" element={<ProfilePage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </HelmetProvider>
        </>
    );
}

export default App;
