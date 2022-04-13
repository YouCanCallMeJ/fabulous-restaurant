import {Injectable} from '@angular/core';
import {RestaurantDatabaseService} from "./restaurant-database.service";
import {Review} from "../models/review.model";
import {Restaurant} from "../models/restaurant.model";

@Injectable({
    providedIn: 'root'
})
export class ReviewDALService {
    
    constructor() {
    }
    
    getDatabaseRestaurant(): any {
        return RestaurantDatabaseService.db;
    }
    
    insertReview(review: Review, callback) {
        function txFunction(tx: any) {
            let sql: string = "INSERT INTO reviews" +
                "(restaurantId, userId, reviewRating, reviewDetail) " +
                "VALUES(?, ?, ?, ?);";
            let options = [
                review.restaurantId,
                review.userId,
                review.reviewRating,
                review.reviewDetail
            ];
            
            console.log(options);
            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: insert review transaction successfully"));
    }
    
    selectAllReview(): Promise<any> {
        let options = [];
        let reviews: Review[] = [];
        
        return new Promise((resolve, reject) => {
            function txFunction(tx) {
                let sql = "SELECT * FROM reviews;";
                
                tx.executeSql(sql, options, (tx, results) => {
                    if (results.rows.length > 0) {
                        for (let i = 0; i < results.rows.length; i++) {
                            let row = results.rows[i];
                            let review = new Review(
                                row['restaurantId'],
                                row['userId'],
                                row['reviewRating'],
                                row['reviewDetail']
                            );
                            review.reviewId = row['reviewId'];
                            reviews.push(review);
                        }
                        resolve(reviews);
                    }
                    // reject
                    else {
                        reject("No reviews found");
                    }
                }, RestaurantDatabaseService.errorHandler)
            }
            
            this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: selectAllReview transaction successfully"));
        });
    }
    
    deleteReview(review: Review, callback) {
        function txFunction(tx: any) {
            let sql: string = "DELETE FROM reviews WHERE reviewId=?;";
            let options = [review.reviewId];
            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: delete review transaction successfully"));
    }
    
    selectReview(reviewId: number): Promise<any> {
        let options = [reviewId];
        
        let review: Review = null;
        
        return new Promise((resolve, reject) => {
            function txFunction(tx) {
                let sql = "SELECT * FROM reviews WHERE reviewId=?;";
                
                tx.executeSql(sql, options, (tx, results) => {
                    // resolve
                    if (results.rows.length > 0) {
                        let row = results.rows[0];
                        let review = new Review(
                            row['restaurantId'],
                            row['userId'],
                            row['reviewRating'],
                            row['reviewDetail']
                        );
                        review.reviewId = row['reviewId'];
                        resolve(review);
                    }
                    // reject
                    else {
                        reject("No such review found");
                    }
                }, RestaurantDatabaseService.errorHandler)
            }
            
            this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: select review transaction successfully"));
        });
    }
    
    updateReview(review: Review, callback) {
        function txFunction(tx: any) {
            let sql: string = "UPDATE reviews SET " +
                "restaurantId=?, " +
                "userId=?, " +
                "reviewRating=?, " +
                "reviewDetail=? " +
                "WHERE reviewId=?;";
            
            // options parameter order does matter here!
            let options = [
                review.restaurantId,
                review.userId,
                review.reviewRating,
                review.reviewDetail,
                review.reviewId
            ];
            
            console.log(options);
            tx.executeSql(sql, options, callback, RestaurantDatabaseService.errorHandler);
        }
        
        this.getDatabaseRestaurant().transaction(txFunction, RestaurantDatabaseService.errorHandler, () => console.log("Success: update review transaction successfully"));
    }
}
