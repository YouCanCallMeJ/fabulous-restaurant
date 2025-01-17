export class User {
    userId: number = -1;
    username: string = "";
    password: string = "";
    firstName: string = "";
    lastName: string = "";
    token: string = "";
    
    constructor(username?: string,
                password?: string,
                firstName?: string,
                lastName?: string) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
