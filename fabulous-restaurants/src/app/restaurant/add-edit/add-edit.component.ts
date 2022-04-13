import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
import {AlertService} from "../../services/alert.service";
import {RestaurantDALService} from "../../services/restaurant-dal.service";
import {Restaurant} from "../../models/restaurant.model";

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
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restaurantDatabaseService: RestaurantDatabaseService,
        private restaurantDALService: RestaurantDALService,
        private alertService: AlertService
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
                .catch(e => console.error(e))
        }
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    onSubmit() {
        this.submitted = true;
    
        // reset alerts on submit
        this.alertService.clear();
    
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
}
