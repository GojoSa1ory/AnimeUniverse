import { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import "./ProfileSettings.scss";
import { useUser } from "../../stores/user.store";
import AuthService from "../../service/auth.service";
import { $api } from "../../api";

function ProfileSettings() {
    const currentUser = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const [file, setFile] = useState<File | null>(null);

    const [updateForm, setUpdateForm] = useState({
        username: currentUser?.username,
        password: "",
        email: currentUser?.email,
        image: currentUser?.image,
        setUsername: (name: string) => {
            setUpdateForm((prev) => ({
                ...prev,
                username: name,
            }));
        },
        setEmail: (email: string) => {
            setUpdateForm((prev) => ({
                ...prev,
                email: email,
            }));
        },
        setNewPassword: (password: string) => {
            setUpdateForm((prev) => ({
                ...prev,
                password: password,
            }));
        },
    });

    const updateUser = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    ) => {
        e?.preventDefault();

        const user = {
            username: updateForm.username,
            email: updateForm.email,
        };

        AuthService.updateUserInfo(currentUser?.username, user)
            .then((data) => {
                localStorage.removeItem("token");
                localStorage.setItem("token", data.data.token);
                setUser(data.data);
                // window.location.reload()
            })
            .catch(() => console.log("Failed update user"));
    };

    const updatePassword = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    ) => {
        e?.preventDefault();

        const user = {
            password: updateForm.password,
        };

        AuthService.updatePassword(currentUser?.name, user).then((data) => {
            localStorage.removeItem("token");
            localStorage.setItem("token", data.data.token);
            setUser(data.data);
            // window.location.reload()
        });
    };

    const getImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
    };

    const updateImage = async () => {
        try {
            if (!file) {
                console.error("No file selected.");
                return;
            }

            const formData = new FormData();
            formData.append("image", file);
            await $api.put(`/user/${currentUser?.name}/image`, formData);
            window.location.reload();
        } catch (error) {
            console.log("Failed update image");
        }
    };

    const deleteUser = async () => {
        AuthService.deleteUser(currentUser?.name)
            .then(() => {
                localStorage.removeItem("token");
                window.location.reload();
            })
            .catch();
    };

    return (
        <>
            <div className="profile-settings-main-layout">
                <div className="user-update-data">
                    <div className="update-user-info">
                        <div className="update-user-info-component">
                            <p>Update ur profile image</p>
                            <input
                                className="user-info-input"
                                type="file"
                                aria-label="File browser example"
                                onChange={(e) => getImage(e)}
                            />
                        </div>

                        <Button
                            title="Update image"
                            onClick={updateImage}
                            className="update-user-info-btn"
                        />
                    </div>

                    <form className="update-user-info">
                        <div className="update-user-info-component">
                            <p>Enter new password</p>
                            <Input
                                className="update-user-info-input"
                                type="password"
                                value={updateForm.password}
                                setValue={updateForm.setNewPassword}
                                placeholder="******"
                            />
                        </div>

                        <Button
                            onClick={(e) => updatePassword(e)}
                            title="Send data"
                            className="update-user-info-btn"
                        />
                    </form>
                </div>

                <div className="user-update-data">
                    <form className="update-user-info">
                        <div className="update-user-info-component">
                            <p>Enter new name</p>
                            <Input
                                className="update-user-info-input"
                                type="text"
                                value={updateForm.username}
                                setValue={updateForm.setUsername}
                                placeholder="Alex"
                            />
                        </div>

                        <div className="update-user-info-component">
                            <p>Enter new email</p>
                            <Input
                                className="update-user-info-input"
                                type="text"
                                value={updateForm.email}
                                setValue={updateForm.setEmail}
                                placeholder="example@gmail.com"
                            />
                        </div>

                        <Button
                            onClick={(e) => updateUser(e)}
                            title="Send new data"
                            className="update-user-info-btn"
                        />
                    </form>

                    <div className="update-user-info">
                        <img src="/images/loaders/fr.gif" width={250} />
                        <Button
                            onClick={deleteUser}
                            title="Delete account"
                            className="update-user-info-btn"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileSettings;
