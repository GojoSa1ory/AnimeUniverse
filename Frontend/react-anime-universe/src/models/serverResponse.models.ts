export class ServerResponse<T> {
    constructor(
        public data: T,
        public message: string,
        public success: boolean
    ){}
}