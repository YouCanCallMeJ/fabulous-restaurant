import {Component} from '@angular/core';
import {RestaurantDatabaseService} from "./services/restaurant-database.service";
import {User} from "./models/user.model";
import {AccountService} from "./services/account.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'fabulous-restaurants';
    user: User;
    
    constructor(
        private restaurantDatabase: RestaurantDatabaseService,
        private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }
    
    ngOnInit(): void {
        this.restaurantDatabase.initDBRestaurant();
    }
}
