import {Component} from '@angular/core';
import {RestaurantDatabaseService} from "./services/restaurant-database.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'fabulous-restaurants';
    
    constructor(private restaurantDatabase: RestaurantDatabaseService) {
    }
    
    ngOnInit(): void {
        this.restaurantDatabase.initDBRestaurant();
    }
}
