export class Book {
    id: number;
    title: string;
    author: string;
    page: number;
    userId: number;

    constructor(id: number, title: string, author: string, page?: number, userId?: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.page = page;
        this.userId = userId;
    }
}