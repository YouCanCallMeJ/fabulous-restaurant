import {Injectable} from '@angular/core';
import {RestaurantDatabaseService} from "./restaurant-database.service";
import {User} from "../models/user.model";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    users: User[] = null;
    userFind: User = null;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router) {
        
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    
    public get userValue(): User {
        return this.userSubject.value;
    }
    
    getDatabaseRestaurant(): any {
        return RestaurantDatabaseService.db;
    }
    
    login(username, password) {
        return new Promise((resolve, reject) => {
            this.selectAllUser()
                .then(data => {
                    this.users = data;
                    this.userFind = this.users.find(x => x.username === username && x.password === password);
                    if (!this.userFind) {
                        alert('Username or password is incorrect');
                        reject("Username or password is incorrect");
                    } else {
                        localStorage.setItem('user', JSON.stringify(this.userFind));
                        // this.router.navigate(['/']);
                        this.userSubject.next(this.userFind);
                        resolve(this.userFind);
                    }
                })
                .catch(error => console.log(error));
        });
    }
    
    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigateByUrl('/account/login');
    }
    
    register(user: User, callback) {
        return new Promise((resolve, reject) => {
            this.selectAllUser()
                .then(data => {
                    this.users = data;
                    if (this.users.find(x => x.username === user.username)) {
                        alert('Username "' + user.username + '" is already taken');
                        reject("Username is already taken");
                    } else {
                        function txFunction(tx: any) {
                            let sql: string = "INSERT INTO users(username, password, firstName, lastName) VALUES(?, ?, ?, ?);";
                            let options = [
                                user.username,
                                user.password,
                                user.firstName,
                                user.lastName
                            ];
                    
                            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
                        }
                
                        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler,
                            () => {
                                console.log("Success: register user transaction successfully");
                        
                                localStorage.setItem("user", JSON.stringify(user));
                                this.userSubject.next(user);
                                
                                resolve(user);
                            });
                    }
                })
                .catch(error => {
                    console.log(error);
                    if (this.users === null) {
                        function txFunction(tx: any) {
                            let sql: string = "INSERT INTO users(username, password, firstName, lastName) VALUES(?, ?, ?, ?);";
                            let options = [
                                user.username,
                                user.password,
                                user.firstName,
                                user.lastName
                            ];
                            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
                        }
                
                        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler,
                            () => {
                                console.log("Success: register user transaction successfully");
                        
                                localStorage.setItem("user", JSON.stringify(user));
                                this.userSubject.next(user);
                                
                                resolve(user);
                            });
                    } else {
                        reject("DB Error");
                    }
                });
            
            // this.selectAllUser()
            //     .then(data => {
            //         this.users = data;
            //         this.userFind = this.users.find(x => x.username === username && x.password === password);
            //         if (!this.userFind) {
            //             alert('Username or password is incorrect');
            //             reject("Username or password is incorrect");
            //         } else {
            //             localStorage.setItem('user', JSON.stringify(this.userFind));
            //             // this.router.navigate(['/']);
            //             this.userSubject.next(this.userFind);
            //             resolve(this.userFind);
            //         }
            //     })
            //     .catch(error => console.log(error));
        });
        
        
        
    }
    
    insertUser(user: User, callback) {
        this.selectAllUser()
            .then(data => {
                this.users = data;
                if (this.users.find(x => x.username === user.username)) {
                    alert('Username "' + user.username + '" is already taken');
                } else {
                    function txFunction(tx: any) {
                        let sql: string = "INSERT INTO users(username, password, firstName, lastName) VALUES(?, ?, ?, ?);";
                        let options = [
                            user.username,
                            user.password,
                            user.firstName,
                            user.lastName
                        ];
                        tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
                    }
    
                    this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: insert user transaction successfully"));
                }
            })
            .catch(error => console.log(error));
    }
    
    selectAllUser(): Promise<any> {
        let options = [];
        let users: User[] = [];
        
        return new Promise((resolve, reject) => {
            function txFunction(tx) {
                let sql = "SELECT * FROM users;";
                
                tx.executeSql(sql, options, (tx, results) => {
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; i++) {
                            let row = results.rows[i];
                            let user = new User(
                                row['username'],
                                row['password'],
                                row['firstName'],
                                row['lastName']
                            );
                            user.userId = row['userId'];
                            users.push(user);
                        }
                        resolve(users);
                    }
                    // reject
                    else {
                        reject("No users found");
                    }
                }, RestaurantDatabaseService.errorHandler)
            }
            
            this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: selectAllUser transaction successfully"));
        });
    }
    
    deleteUser(user: User, callback) {
        if (user.userId === 1) {
            alert("You cannot delete admin user.")
            return;
        } else {
            function txFunction(tx: any) {
                let sql: string = "DELETE FROM users WHERE userId=?;";
                let options = [user.userId];

                console.log(options);
                tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
            }

            this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: delete user transaction successfully"));
        }
    }
    
    selectUser(userId: number): Promise<any> {
        let options = [userId];
        
        let user: User = null;
        
        return new Promise((resolve, reject) => {
            function txFunction(tx) {
                let sql = "SELECT * FROM users WHERE userId=?;";
                
                tx.executeSql(sql, options, (tx, results) => {
                    // resolve
                    if (results.rows.length > 0) {
                        let row = results.rows[0];
                        let user = new User(
                            row['username'],
                            row['password'],
                            row['firstName'],
                            row['lastName']
                        );
                        user.userId = row['userId'];
                        resolve(user);
                    }
                    // reject
                    else {
                        reject("No such user found");
                    }
                }, RestaurantDatabaseService.errorHandler)
            }
            
            this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: select user transaction successfully"));
        });
    }
    
    updateUser(user: User, callback) {
        function txFunction(tx: any) {
            let sql: string = "UPDATE users SET username=?, password=?, lastName=?, firstName=? WHERE userId=?;";
            
            // options parameter order does matter here!
            let options = [
                user.username,
                user.password,
                user.firstName,
                user.lastName,
                user.userId
            ];
            
            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: update user transaction successfully"));
    }
}
