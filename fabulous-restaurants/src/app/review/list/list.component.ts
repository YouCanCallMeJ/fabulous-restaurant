import {Component, OnInit} from '@angular/core';
import {ReviewDALService} from "../../services/review-dal.service";
import {Review} from "../../models/review.model";
import {Router} from "@angular/router";
import {Restaurant} from "../../models/restaurant.model";
import {RestaurantDALService} from "../../services/restaurant-dal.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    reviews: Review[] = null;
    restaurants: Restaurant[] = null;
    
    constructor(
        private router: Router,
        private reviewDALService: ReviewDALService,
        private restaurantDALService: RestaurantDALService) {
    }
    
    ngOnInit(): void {
        this.reviewDALService.selectAllReview()
            .then(data => {
                this.reviews = data;
            })
            .catch(error => {
                console.log(error);
            });
        this.restaurantDALService.selectAllRestaurant()
            .then(data => {
                this.restaurants = data;
                console.log(this.restaurants[0].restaurantName);
            })
            .catch(error => console.log(error));
    }
}
