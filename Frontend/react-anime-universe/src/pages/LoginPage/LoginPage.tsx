import "./login-page.scss";
import { Helmet } from "react-helmet-async";
import Form from "../../components/UI/Form/Form";
import { useState } from "react";
import AuthService from "../../service/auth.service";
import { useUser } from "../../stores/user.store";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";
import { ILoginUser } from "../../models/user.model";

function LoginPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [notification, setNotification] = useState({
        showNot: false,
        negative: false,
    });

    const nav = useNavigate();

    const setUser = useUser((state) => state.setUser);

    const auth = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    ) => {
        e?.preventDefault();
        const user: ILoginUser = {
            name: form.username,
            password: form.password,
        };

        AuthService.loginUser(user)
            .then((response) => {
                localStorage.setItem("token", response.data.data.token);
                console.log(response.data.data.token);
                setUser(response.data.data.user);
                nav("/");
                window.location.reload();
            })
            .catch(() => {
                setNotification({
                    negative: true,
                    showNot: true,
                });
            });
    };

    const setShowNot = (state: boolean) => {
        setNotification({
            negative: false,
            showNot: state,
        });
    };

    const setUsername = (username: string) => {
        setForm((prev) => ({
            ...prev,
            username: username,
        }));
    };

    const setPassword = (password: string) => {
        setForm((prev) => ({
            ...prev,
            password: password,
        }));
    };

    return (
        <>
            <Helmet
                title="Login page"
                meta={[
                    {
                        name: "description",
                        content: "Registration page of AnimeUniverse website",
                    },
                    { property: "og:type", content: "article" },
                ]}
            />

            {notification.showNot && (
                <Notification
                    isNegative={notification.negative}
                    negativeMesage="Login failed. User was not found or ur data is invalid"
                    setShowToast={setShowNot}
                    positiveMessage="Login successful"
                />
            )}

            <section className="login-layout bg-home">
                <div className="login-form-container">
                    <h1>Welcome back!</h1>
                    <Form
                        username={form.username}
                        password={form.password}
                        setUsername={setUsername}
                        isLoginPage={true}
                        setPassword={setPassword}
                        onClick={auth}
                    />
                </div>
            </section>
        </>
    );
}

export default LoginPage;
