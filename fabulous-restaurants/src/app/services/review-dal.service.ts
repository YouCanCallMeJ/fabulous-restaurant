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
}
