export class Restaurant {
    id: number = -1;
    restaurantName: string = "";
    restaurantLocation: string = "";
    restaurantMainMenu: string = "";
    restaurantPhone: string = "";
    
    constructor(restaurantName?: string,
                restaurantLocation?: string,
                restaurantMainMenu?: string,
                restaurantPhone?: string) {
        this.restaurantName = restaurantName;
        this.restaurantLocation = restaurantLocation;
        this.restaurantMainMenu = restaurantMainMenu;
        this.restaurantPhone = restaurantPhone;
    }
}
