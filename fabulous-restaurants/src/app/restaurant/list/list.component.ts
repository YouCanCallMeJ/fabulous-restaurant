import {Component, OnInit} from '@angular/core';
import {RestaurantDALService} from "../../services/restaurant-dal.service";
import {Restaurant} from "../../models/restaurant.model";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    restaurants: Restaurant[] = null;
    
    constructor(private restaurantDALService: RestaurantDALService) {
    }
    
    ngOnInit(): void {
        this.restaurantDALService.selectAllRestaurant()
            .then(data => this.restaurants = data)
            .catch(error => console.log(error));
    }
    
    deleteUser(id: number) {
        const restaurant = this.restaurants.find(x => x.id === id);
        // restaurant.isDeleting = true;
        this.restaurantDALService.deleteRestaurant(restaurant, () => {
            alert("Record deleted successfully");
        });
        this.ngOnInit();
    }
}
