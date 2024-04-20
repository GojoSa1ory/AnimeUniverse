import { create } from "zustand";
import { CommentModel } from "../models/comment.model";

type IUseCommet = {
    comment: CommentModel | null;
    comments: CommentModel[] | [];
    setComment(newComment: CommentModel | null): void;
    setComments(newComments: CommentModel[] | []): void;
};

export const useComment = create<IUseCommet>((set) => ({
    comment: null,
    comments: [],

    setComment(newComment) {
        set({
            comment: newComment,
        });
    },

    setComments(newComments) {
        set({
            comments: newComments,
        });
    },
}));
