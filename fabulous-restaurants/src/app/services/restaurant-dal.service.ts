import { Injectable } from '@angular/core';
import {Restaurant} from "../models/restaurant.model";
import {RestaurantDatabaseService} from "./restaurant-database.service";

@Injectable({
  providedIn: 'root'
})
export class RestaurantDALService {

  constructor(private restaurantDatabaseService: RestaurantDatabaseService) { }
  
  getDatabaseRestaurant(): any {
    this.restaurantDatabaseService.initDBRestaurant();
    return RestaurantDatabaseService.db;
  }
  
  insertRestaurant(restaurant: Restaurant, callback) {
    function txFunction(tx: any) {
      let sql: string = "INSERT INTO restaurants" +
          "(restaurantName, restaurantLocation, restaurantMainMenu, restaurantPhone) " +
          "VALUES(?, ?, ?, ?);";
      let options = [
        restaurant.restaurantName,
        restaurant.restaurantLocation,
        restaurant.restaurantMainMenu,
        restaurant.restaurantPhone
      ];
      
      tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    }
    
    this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: insert transaction successfully"));
  }
  
  selectAllRestaurant(): Promise<any> {
    let options = [];
    let restaurants: Restaurant[] = [];
    
    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM restaurants;";
        
        tx.executeSql(sql, options, (tx, results) => {
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let restaurant = new Restaurant(
                  row['restaurantName'],
                  row['restaurantLocation'],
                  row['restaurantMainMenu'],
                  row['restaurantPhone']
              );
              restaurant.id = row['id'];
              restaurants.push(restaurant);
            }
            resolve(restaurants);
          }
          // reject
          else {
            reject("No restaurants found");
          }
        }, RestaurantDatabaseService.errorHandler)
      }
      
      this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: selectAll transaction successfully"));
    });
  }
  
  deleteRestaurant(restaurant: Restaurant, callback) {
    function txFunction(tx: any) {
      let sql: string = "DELETE FROM restaurants WHERE id=?;";
      let options = [restaurant.id];
      tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    }
    
    this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: delete transaction successfully"));
  }
  
  updateRestaurant(restaurant: Restaurant, callback) {
    function txFunction(tx: any) {
      let sql: string = "UPDATE restaurants SET " +
          "restaurantName=?, " +
          "restaurantLocation=?, " +
          "restaurantMainMenu=?, " +
          "restaurantPhone=?, " +
          "WHERE id=?;";
      
      // options parameter order does matter here!
      let options = [
        restaurant.restaurantName,
        restaurant.restaurantLocation,
        restaurant.restaurantMainMenu,
        restaurant.restaurantPhone,
        restaurant.id
      ];
      
      tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
    }
    
    this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: update transaction successfully"));
  }
  
  selectRestaurant(id: number): Promise<any> {
    let options = [id];
    
    let restaurant: Restaurant = null;
    
    return new Promise((resolve, reject) => {
      function txFunction(tx) {
        let sql = "SELECT * FROM restaurants WHERE id=?;";
        
        tx.executeSql(sql, options, (tx, results) => {
          // resolve
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let restaurant = new Restaurant(
                row['restaurantName'],
                row['restaurantLocation'],
                row['restaurantMainMenu'],
                row['restaurantPhone']
            );
            restaurant.id = row['id'];
            resolve(restaurant);
          }
          // reject
          else {
            reject("No such restaurant found");
          }
        }, RestaurantDatabaseService.errorHandler)
      }
      
      this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: select transaction successfully"));
    });
  }
}