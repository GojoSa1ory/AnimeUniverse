import axios, { AxiosResponse } from "axios";
import { ServerResponse } from "../models/serverResponse.models.ts";
import { CommentModel, SetCommentModel } from "../models/comment.model.ts";
import { $api } from "../api";

export class CommentService {
    private static base_url = "http://localhost:5054";

    static getComments(
        id: string | undefined,
    ): Promise<AxiosResponse<ServerResponse<CommentModel[]>>> {
        return axios.get<ServerResponse<CommentModel[]>>(
            `${this.base_url}/Comment/get/animeId?animeId=${id}`,
        );
    }

    static sendComment(
        id: string | undefined,
        comment: SetCommentModel,
    ): Promise<AxiosResponse<ServerResponse<CommentModel>>> {
        return $api.post(`${this.base_url}/Comment/create/${id}`, comment);
    }

    static updateComment(
        commentId: string | number | undefined,
        animeId: string | undefined,
        comment: SetCommentModel,
    ): Promise<AxiosResponse<ServerResponse<CommentModel[]>>> {
        return $api.patch<ServerResponse<CommentModel[]>>(
            `${this.base_url}/Comment/update/animeId/commentId?animeId=${animeId}&commentId=${commentId}`,
            comment,
        );
    }

    static deleteComment(
        commentId: string | number | undefined,
    ): Promise<AxiosResponse<ServerResponse<string>>> {
        return $api.delete<ServerResponse<string>>(
            `${this.base_url}/Comment/delete/commentId?commentId=${commentId}`,
        );
    }
}
