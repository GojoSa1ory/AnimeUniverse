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
import { UserService } from "./service/user.service";
import { AllAnimePage } from "./pages/AllAnimePage/AllAnimePage";
import { routes } from "./constants/Routes";

function App() {
    const setUser = useUser((state) => state.setUser);

    const checkAuth = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                //TODO: Remake checkAuth function

                AuthService.checkAuth()
                    .then((res) => {
                        UserService.getUser(res.data.data.id)
                            .then((res) => setUser(res.data.data))
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
                    <Route path={routes.home} element={<MainLayout />}>
                        <Route
                            index
                            path={routes.home}
                            element={<HomePage />}
                        />
                        <Route
                            path={`${routes.oneAnime}:id`}
                            element={<AnimePage />}
                        />
                        <Route path={routes.login} element={<LoginPage />} />
                        <Route path={routes.register} element={<RegPage />} />
                        <Route
                            path={routes.allAnime}
                            element={<AllAnimePage />}
                        />

                        {/* Private Routes */}
                        <Route element={<AuthGuard />}>
                            <Route
                                path={routes.userCollections}
                                element={<CollectionsPage />}
                            />
                            <Route
                                path={`${routes.userCollection}:id`}
                                element={<CollectionPage />}
                            />
                            <Route
                                path={routes.profile}
                                element={<ProfilePage />}
                            />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </HelmetProvider>
        </>
    );
}

export default App;
