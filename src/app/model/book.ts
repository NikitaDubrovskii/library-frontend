import {User} from "./user";

export class Book {
    id: number;
    title: string;
    author: string;
    page: number;
    taken: boolean;
    userId: User;
    expired: boolean;

    constructor(id: number, title: string, author: string, page?: number, taken?: boolean, userId?: User, expired?: boolean) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.page = page;
        this.taken = taken;
        this.userId = userId;
        this.expired = expired;
    }
}