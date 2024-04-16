import "./commentView.style.scss";
import { CommentModel } from "../../../models/comment.model";

export const CommentView = ({ comments }: { comments: CommentModel }) => {
    return (
        <div className="comments-container">
            <div className="flex justify-center items-center">
                <img
                    className="w-[50px] h-[50px] rounded-full overflow-hidden mr-5"
                    src={`${comments.user.profileImage == null || comments.user.profileImage == "string" ? "../public/bg.jpg" : comments.user.profileImage}`}
                    alt={`${comments.user.name} avatar`}
                />
                <p>{comments.user.name}</p>
            </div>

            <p className="mt-5">{comments.text}</p>
        </div>
    );
};
