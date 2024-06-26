import {useState} from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import "./ProfileSettings.scss";
import {useUser} from "../../stores/user.store";
import {UserService} from "../../service/user.service";
import {ISetUser} from "../../models/user.model";

function ProfileSettings() {
    const currentUser = useUser((state) => state.user);
    const setUser = useUser((state) => state.setUser);
    const [file, setFile] = useState<File | null>(null);

    const [updateForm, setUpdateForm] = useState({
        name: currentUser?.name,
        password: "",
        email: currentUser?.email,
        image: currentUser?.profileImage,
    });

    const setPassword = (pass: string) => {
        setUpdateForm((prev) => ({
            ...prev,
            password: pass,
        }));
    };

    const setName = (name: string) => {
        setUpdateForm((prev) => ({
            ...prev,
            name: name,
        }));
    };

    const setEmail = (email: string) => {
        setUpdateForm((prev) => ({
            ...prev,
            email: email,
        }));
    };

    const updateUser = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    ) => {
        e?.preventDefault();

        const user: ISetUser = {
            name: updateForm.name,
            email: updateForm.email,
        };

        UserService.updateUserInfo(user)
            .then((res) => {
                setUser(res.data.data);
                window.location.reload();
            })
            .catch(() => console.log("Failed update user"));
    };

    const updatePassword = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined,
    ) => {
        e?.preventDefault();

        const user: ISetUser = {
            password: updateForm.password,
        };

        UserService.updateUserInfo(user).then((data) => {
            setUser(data.data.data);
            window.location.reload();
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
            formData.append("ProfileImage", file);

            const user: ISetUser = {
                profileImage: formData.get("ProfileImage"),
            };

            UserService.updateImage(user).then((response) =>
                console.log(response.data),
            );

            window.location.reload();
        } catch (error) {
            console.log("Failed update image");
        }
    };

    const deleteUser = async () => {
        UserService.deleteUser(currentUser?.name)
            .then(() => {
                localStorage.removeItem("token");
                window.location.reload();
            })
            .catch();
    };

    return (
        <>
            <div className="profile-settings-main-layout">
                <div className={`bg-black rounded-md p-5 w-[340px] m-auto`}>
                    <p>Update ur profile image</p>
                    <input
                        className="user-info-input my-4"
                        type="file"
                        aria-label="File browser example"
                        onChange={(e) => getImage(e)}
                    />

                    <Button
                        title="Update image"
                        onClick={updateImage}
                        className="update-user-info-btn"
                    />
                </div>

                <div className={`flex flex-col justify-center items-center bg-black rounded-md p-5 w-[340px] m-auto`}>
                    <div className="update-user-info-component">
                        <p>Enter new password</p>
                        <Input
                            className="update-user-info-input"
                            type="password"
                            value={updateForm.password}
                            setValue={setPassword}
                            placeholder="******"
                        />
                    </div>

                    <Button
                        onClick={(e) => updatePassword(e)}
                        title="Send data"
                        className="update-user-info-btn mt-5"
                    />
                </div>

                <div className={`flex flex-col justify-center items-center bg-black rounded-md p-5 w-[340px] m-auto`}>
                    <div className="update-user-info-component">
                        <p>Enter new name</p>
                        <Input
                            className="update-user-info-input"
                            type="text"
                            value={updateForm.name}
                            setValue={setName}
                            placeholder="Alex"
                        />
                    </div>

                    <div className="update-user-info-component">
                        <p>Enter new email</p>
                        <Input
                            className="update-user-info-input"
                            type="text"
                            value={updateForm.email}
                            setValue={setEmail}
                            placeholder="example@gmail.com"
                        />
                    </div>

                    <Button
                        onClick={(e) => updateUser(e)}
                        title="Send new data"
                        className="update-user-info-btn mt-5"
                    />

                </div>

                <div className={`flex flex-col justify-center items-center bg-black rounded-md p-5 w-[340px] m-auto`}>
                    <img
                        src="/images/loaders/fr.gif"
                        className="rounded-xl mb-3"
                        width={250}
                    />
                    <Button
                        onClick={deleteUser}
                        title="Delete account"
                        className="update-user-info-btn"
                    />
                </div>

            </div>
        </>
    );
}

export default ProfileSettings;

//
// <div className="update-user-info">
//     <div className="update-user-info-component">
//         <p>Update ur profile image</p>
//         <input
//             className="user-info-input"
//             type="file"
//             aria-label="File browser example"
//             onChange={(e) => getImage(e)}
//         />
//     </div>
//
//     <Button
//         title="Update image"
//         onClick={updateImage}
//         className="update-user-info-btn"
//     />
// </div>
//
// <form className="update-user-info">
//     <div className="update-user-info-component">
//         <p>Enter new password</p>
//         <Input
//             className="update-user-info-input"
//             type="password"
//             value={updateForm.password}
//             setValue={setPassword}
//             placeholder="******"
//         />
//     </div>
//
//     <Button
//         onClick={(e) => updatePassword(e)}
//         title="Send data"
//         className="update-user-info-btn"
//     />
// </form>
//
// <form className="update-user-info">
//     <div className="update-user-info-component">
//         <p>Enter new name</p>
//         <Input
//             className="update-user-info-input"
//             type="text"
//             value={updateForm.name}
//             setValue={setName}
//             placeholder="Alex"
//         />
//     </div>
//
//     <div className="update-user-info-component">
//         <p>Enter new email</p>
//         <Input
//             className="update-user-info-input"
//             type="text"
//             value={updateForm.email}
//             setValue={setEmail}
//             placeholder="example@gmail.com"
//         />
//     </div>
//
//     <Button
//         onClick={(e) => updateUser(e)}
//         title="Send new data"
//         className="update-user-info-btn"
//     />
// </form>
//
// <div className="update-user-info">
//     <img
//         src="/images/loaders/fr.gif"
//         className="rounded-xl mb-3"
//         width={250}
//     />
//     <Button
//         onClick={deleteUser}
//         title="Delete account"
//         className="update-user-info-btn"
//     />
// </div>