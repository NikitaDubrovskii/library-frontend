import {Book} from "./book";

export class User {
    id: number;
    firstName: string;
    secondName: string;
    fullName: string;
    email: string;
    bookList: Book[];

    constructor(id: number, firstName: string, secondName: string, email: string, bookList?: Book[]) {
        this.id = id;
        this.firstName = firstName;
        this.secondName = secondName;
        this.fullName = firstName + ' ' + secondName;
        this.email = email;
        this.bookList = bookList;
    }
}