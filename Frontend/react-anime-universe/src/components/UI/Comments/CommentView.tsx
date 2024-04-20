import "./commentView.style.scss";
import { CommentModel } from "../../../models/comment.model";
import { CommentService } from "../../../service/comment.service";
import { useComment } from "../../../stores/comment.store";
import { useState } from "react";
import Button from "../Button/Button";
import { useUser } from "../../../stores/user.store";

export const CommentView = ({ comment }: { comment: CommentModel }) => {
    const setComments = useComment((state) => state.setComments);
    const user = useUser((state) => state.user);

    const [text, setText] = useState<string>(comment.text);
    const [isEdited, setIsEdidet] = useState<boolean>(false);

    function checkCommentForEdit() {
        if (user?.id === comment.user.id)
            if (isEdited)
                return (
                    <div className="flex flex-row justify-items-center">
                        <Button
                            className="ml-2 mr-2"
                            onClick={() => handleEdit()}
                        >
                            Send
                        </Button>
                        <Button
                            className="ml-2 mr-2"
                            onClick={() => setIsEdidet(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                );
            else
                return (
                    <div className="flex flex-row justify-items-center">
                        <Button
                            className="ml-2 mr-2"
                            onClick={() => setIsEdidet(true)}
                        >
                            Edit
                        </Button>
                        <Button
                            className="ml-2 mr-2"
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </Button>
                    </div>
                );
    }

    function handleEdit() {
        const newComment: CommentModel = {
            ...comment,
            text: text,
        };

        CommentService.updateComment(
            comment?.id,
            comment?.anime[0].id,
            newComment,
        )
            .then(() =>
                CommentService.getComments(comment.anime[0].id)
                    .then((res) => setComments(res.data.data))
                    .catch((err) => console.log(err)),
            )
            .catch((err) => {
                console.error(err);
                // setComment(null);
            })
            .finally(() => setIsEdidet(false));
    }

    function handleDelete() {
        CommentService.deleteComment(comment?.id)
            .then((response) => {
                console.log(response);
                // setComment(null);
            })
            .catch((err) => console.error(err));
    }

    return (
        <div className="comments-container">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-row justify-center items-center">
                    <img
                        className="w-[50px] h-[50px] rounded-full overflow-hidden mr-5"
                        src={`${comment?.user.profileImage == null || comment?.user.profileImage == "string" ? "../public/bg.jpg" : comment?.user.profileImage}`}
                        alt={`${comment?.user.name} avatar`}
                    />
                    <p>{comment?.user.name}</p>
                </div>

                {checkCommentForEdit()}
            </div>

            {isEdited ? (
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="mt-5 outline-none border-solid border-2 border-white comments-container w-full min-h-[100px]"
                >
                    {comment?.text}
                </textarea>
            ) : (
                <p className="mt-5 p-3">{comment.text}</p>
            )}
        </div>
    );
};
