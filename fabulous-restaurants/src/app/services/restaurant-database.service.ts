import {Injectable} from '@angular/core';

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
            
            tx.executeSql(sql, options, () => console.log("Success: create table restaurants successfully"), RestaurantDatabaseService.errorHandler);
    
            sql = "CREATE TABLE IF NOT EXISTS users(" +
                "userId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "username TEXT NOT NULL," +
                "password TEXT NOT NULL," +
                "firstName TEXT NOT NULL," +
                "lastName TEXT NOT NULL);";
    
            tx.executeSql(sql, options, () => console.log("Success: create table users successfully"), RestaurantDatabaseService.errorHandler);
            
            sql = "CREATE TABLE IF NOT EXISTS reviews(" +
                "reviewId INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "restaurantId INTEGER NOT NULL," +
                "userId INTEGER NOT NULL," +
                "reviewRating INTEGER NOT NULL," +
                "reviewDetail TEXT NOT NULL," +
                "FOREIGN KEY(restaurantId) REFERENCES restaurants(id)," +
                "FOREIGN KEY(userId) REFERENCES users(userId));";

            tx.executeSql(sql, options, () => console.log("Success: create table reviews successfully"), RestaurantDatabaseService.errorHandler);
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
