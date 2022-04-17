import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
import {RestaurantDALService} from "../../services/restaurant-dal.service";
import {Restaurant} from "../../models/restaurant.model";

declare var H: any;

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: number;
    isAddMode: boolean = true;
    submitted = false;
    restaurant: Restaurant = null;
    restaurants: Restaurant[] = null;
    
    lati: any;
    lngi: any;
    useGPS: Boolean = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restaurantDatabaseService: RestaurantDatabaseService,
        private restaurantDALService: RestaurantDALService
    ) { }
    
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        this.isAddMode = !this.id;
        
        this.form = this.formBuilder.group({
            restaurantName: ['', Validators.required],
            restaurantLocation: ['', Validators.required],
            restaurantMainMenu: ['', Validators.required],
            restaurantPhone: ['', [Validators.required, Validators.pattern("^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$")]],
            id: ['']
        });
    
        if (!this.isAddMode) {
            this.restaurantDALService.selectRestaurant(this.id)
                .then(data => {
                    this.restaurant = data;
                    this.form.patchValue({
                        restaurantName: this.restaurant.restaurantName,
                        restaurantLocation: this.restaurant.restaurantLocation,
                        restaurantMainMenu: this.restaurant.restaurantMainMenu,
                        restaurantPhone: this.restaurant.restaurantPhone,
                        id: this.restaurant.id
                        }
                    );
                })
                .catch(e => console.error(e));
            
            this.restaurantDALService.selectAllRestaurant()
                .then(data => {
                    this.restaurants = data;
                })
                .catch(e => console.error(e));
        }
    
        if (navigator.geolocation) {
            let options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition((position) => {
                this.lati = position.coords.latitude;
                this.lngi = position.coords.longitude;
                alert("GPS is ready!");
                this.useGPS = true;
            }, () => {
                alert("Can't get current location");
            }, options);
            alert('navigator is available.');
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    onSubmit() {
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
        
        if (this.isAddMode) {
            this.createRestaurant();
        } else {
            this.updateRestaurant();
        }
    }
    
    private createRestaurant() {
        this.restaurantDALService.insertRestaurant(this.form.value, ()=> {
            console.log("Success: Record added successfully");
            alert("Success: Record added successfully");
        });
    }
    
    private updateRestaurant() {
        this.restaurantDALService.updateRestaurant(this.form.value, ()=> {
            console.log("Success: Record updated successfully");
            alert("Success: Record updated successfully");
        });
    }
    
    deleteRestaurant(id: number) {
        const restaurant = this.restaurants.find(x => x.id === id);
        this.restaurantDALService.deleteRestaurant(restaurant, () => {
            alert("Record deleted successfully");
            this.router.navigateByUrl('/');
        });
    }
    
    public btnFindLocation_click() {
        document.getElementById('mapContainer').innerHTML = '';
        // Initialize the platform object:
        var platform = new H.service.Platform({
            'apikey': 'MroIgMS9oYam4pI0Bpef76GWyjt5oNdSvhw4_g-8GT8'
        });
    
        // Obtain the default map types from the platform object
        var maptypes = platform.createDefaultLayers();
    
        var options = {
            zoom: 15,
            center: {
                lat: this.lati, lng: this.lngi
            }
        };
    
        // Instantiate (and display) a map object:
        var map = new H.Map(
            document.getElementById('mapContainer'),
            maptypes.vector.normal.map,
            options
        );
    
        var icon = new H.map.Icon('assets/marker.png');
        var marker = new H.map.Marker({
            lat: this.lati, lng: this.lngi
        }, {icon: icon});
    
        // Add the marker to the map and center the map at the location of the marker:
        map.addObject(marker);
        
        // Simple GET request using fetch
        const element = document.querySelector('#restaurantLocation');
        fetch(`https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?prox=${this.lati}%2C${this.lngi}&mode=retrieveAddresses&maxresults=1&gen=9&apiKey=MroIgMS9oYam4pI0Bpef76GWyjt5oNdSvhw4_g-8GT8`)
            .then(response => response.json())
            .then(data => {
                element.innerHTML = data.Response.MataInfo;
                this.form.patchValue({
                    restaurantLocation: data.Response.View[0].Result[0].Location.Address.Label
                });
            });
    }
}
