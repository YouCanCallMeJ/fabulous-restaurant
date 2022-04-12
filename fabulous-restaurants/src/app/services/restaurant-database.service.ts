import {Injectable} from '@angular/core';
import {Restaurant} from "../models/restaurant.model";

declare function openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess): any;

@Injectable({
    providedIn: 'root'
})
export class RestaurantDatabaseService {
    public static db: any = null;
    
    constructor() {
    }
    
    public static errorHandler(e): any {
        console.error("Error: " + e);
    }
    
    private createDatabaseRestaurant(): void {
        const shortName = "RestaurantDB";
        const version = "1.0";
        const displayName = "RestaurantDB for Angular Fabulous Restaurant App";
        const dbSize = 2 * 1024 * 1024;
        
        // TypeScript Traits
        RestaurantDatabaseService.db = openDatabase(shortName, version, displayName, dbSize, () => console.log("Success: Database created"));
    }
    
    private createTablesRestaurant(): void {
        function txFunction(tx: any): void {
            let sql: string = "CREATE TABLE IF NOT EXISTS restaurants(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantName TEXT NOT NULL," +
                "restaurantLocation TEXT NOT NULL," +
                "restaurantMainMenu TEXT NOT NULL," +
                "restaurantPhone TEXT NOT NULL);";
            let options = [];
            
            tx.executeSql(sql, options, () => console.log("Success: create table successfully"), RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: Table creation transaction successful"));
    }
    
    initDBRestaurant(): void {
        if (RestaurantDatabaseService.db == null) {
            try {
                // create database
                this.createDatabaseRestaurant();
                // create tables
                this.createTablesRestaurant();
            } catch (e) {
                console.error("Error in initDB(): " + e)
            }
        }
    }
    
    getDatabaseRestaurant(): any {
        this.initDBRestaurant();
        return RestaurantDatabaseService.db;
    }
    
    // insertRestaurant(restaurant: Restaurant, callback) {
    //     function txFunction(tx: any) {
    //         let sql: string = "INSERT INTO restaurants" +
    //             "(restaurantName, restaurantLocation, restaurantMainMenu, restaurantPhone) " +
    //             "VALUES(?, ?, ?, ?);";
    //         let options = [
    //             restaurant.restaurantName,
    //             restaurant.restaurantLocation,
    //             restaurant.restaurantMainMenu,
    //             restaurant.restaurantPhone
    //         ];
    //
    //         tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    //     }
    //
    //     this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: insert transaction successfully"));
    // }
    //
    // selectAllRestaurant(): Promise<any> {
    //     let options = [];
    //     let restaurants: Restaurant[] = [];
    //
    //     return new Promise((resolve, reject) => {
    //         function txFunction(tx) {
    //             let sql = "SELECT * FROM restaurants;";
    //
    //             tx.executeSql(sql, options, (tx, results) => {
    //                 if (results.rows.length > 0) {
    //                     for (let i = 0; i < results.rows.length; i++) {
    //                         let row = results.rows[i];
    //                         let restaurant = new Restaurant(
    //                             row['restaurantName'],
    //                             row['restaurantLocation'],
    //                             row['restaurantMainMenu'],
    //                             row['restaurantPhone']
    //                         );
    //                         restaurant.id = row['id'];
    //                         restaurants.push(restaurant);
    //                     }
    //                     resolve(restaurants);
    //                 }
    //                 // reject
    //                 else {
    //                     reject("No books found");
    //                 }
    //             }, RestaurantDatabaseService.errorHandler)
    //         }
    //
    //         this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: selectAll transaction successfully"));
    //
    //     });
    // }
    //
    // deleteRestaurant(restaurant: Restaurant, callback) {
    //     function txFunction(tx: any) {
    //         let sql: string = "DELETE FROM restaurants WHERE id=?;";
    //         let options = [restaurant.id];
    //         tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    //     }
    //
    //     this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: delete transaction successfully"));
    // }
    //
    // updateRestaurant(restaurant: Restaurant, callback) {
    //     function txFunction(tx: any) {
    //         let sql: string = "UPDATE restaurants SET " +
    //             "restaurantName=?, " +
    //             "restaurantLocation=?, " +
    //             "restaurantMainMenu=?, " +
    //             "restaurantPhone=?, " +
    //             "WHERE id=?;";
    //
    //         // options parameter order does matter here!
    //         let options = [
    //             restaurant.restaurantName,
    //             restaurant.restaurantLocation,
    //             restaurant.restaurantMainMenu,
    //             restaurant.restaurantPhone,
    //             restaurant.id
    //         ];
    //
    //         tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    //     }
    //
    //     this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: update transaction successfully"));
    // }
    //
    // selectRestaurant(id: number): Promise<any> {
    //     let options = [id];
    //
    //     let restaurant: Restaurant = null;
    //
    //     return new Promise((resolve, reject) => {
    //         function txFunction(tx) {
    //             let sql = "SELECT * FROM restaurants WHERE id=?;";
    //
    //             tx.executeSql(sql, options, (tx, results) => {
    //                 // resolve
    //                 if (results.rows.length > 0) {
    //                     let row = results.rows[0];
    //                     let restaurant = new Restaurant(
    //                         row['restaurantName'],
    //                         row['restaurantLocation'],
    //                         row['restaurantMainMenu'],
    //                         row['restaurantPhone']
    //                     );
    //                     restaurant.id = row['id'];
    //                     resolve(restaurant);
    //                 }
    //                 // reject
    //                 else {
    //                     reject("No such restaurant found");
    //                 }
    //             }, RestaurantDatabaseService.errorHandler)
    //         }
    //
    //         this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: select transaction successfully"));
    //     });
    // }
    
    private dropTablesRestaurant(): void {
        function txFunction(tx: any): void {
            let sql: string = "DROP TABLE IF EXISTS restaurants;";
            let options = [];
            
            tx.executeSql(sql, options, () => console.log("Success: drop table restaurants successfully"), RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: Table restaurants drop transaction successful"));
    }
    
    clearDBRestaurant(): void {
        let result = confirm("Really want to clear database restaurants?");
        if (result) {
            this.dropTablesRestaurant();
            RestaurantDatabaseService.db = null;
            alert("Database restaurants cleared");
        }
    }
}
