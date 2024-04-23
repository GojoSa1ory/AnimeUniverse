import "./register-page.scss";
import { Helmet } from "react-helmet-async";
import Form from "../../components/UI/Form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth.service";
import { useUser } from "../../stores/user.store";
import Notification from "../../components/Notification/Notification";

function RegPage() {
    const [form, setForm] = useState({
        username: "",
        email: "",
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
        const user = {
            name: form.username,
            email: form.email,
            profileImage: "string",
            password: form.password,
        };
        console.log(user);

        AuthService.registerUser(user)
            .then((response) => {
                console.log(response.data.data);
                localStorage.setItem("token", response.data.data.token);
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
    const setEmail = (email: string) => {
        setForm((prev) => ({
            ...prev,
            email: email,
        }));
    };
    const setShowToast = (state: boolean) => {
        setNotification({
            negative: false,
            showNot: state,
        });
    };

    return (
        <>
            <Helmet
                title="Reg page"
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
                    negativeMesage="Register failed. Your data is invalid or user is already created."
                    setShowToast={setShowToast}
                    positiveMessage="Login successful"
                />
            )}

            <section className="register-layout bg-home">
                <div className="register-form-container">
                    <h1>Welcome to our family!</h1>
                    <h2>Create an account</h2>
                    <Form
                        username={form.username}
                        password={form.password}
                        email={form.email}
                        setEmail={setEmail}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        onClick={auth}
                        isLoginPage={false}
                    />
                </div>
            </section>
        </>
    );
}

export default RegPage;
