import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../models/review.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
import {ReviewDALService} from "../../services/review-dal.service";
import {Restaurant} from "../../models/restaurant.model";
import {RestaurantDALService} from "../../services/restaurant-dal.service";

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
    review: Review = null;
    reviews: Review[] = null;
    restaurants: Restaurant[] = null;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restaurantDatabaseService: RestaurantDatabaseService,
        private restaurantDALService: RestaurantDALService,
        private reviewDALService: ReviewDALService
    ) { }
    
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        this.isAddMode = !this.id;
        
        this.form = this.formBuilder.group({
            restaurantId: ['', Validators.required],
            username: [JSON.parse(localStorage.getItem("user")).username, Validators.required],
            reviewRating: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
            reviewDetail: ['', Validators.required],
            reviewId: ['']
        });
    
        this.restaurantDALService.selectAllRestaurant()
            .then(data => {
                this.restaurants = data;
            })
            .catch(e => {
                console.error(e);
                alert("No restaurant found. Enter a restaurant first.");
                this.router.navigate(['/restaurant/list']);
            })
        this.reviewDALService.selectAllReview()
            .then(data => {
                this.reviews = data;
            })
            .catch(e => {
                console.error(e);
            })
        
        if (!this.isAddMode) {
            this.reviewDALService.selectReview(this.id)
                .then(data => {
                    this.review = data;
                    this.form.patchValue({
                        restaurantId: this.review.restaurantId,
                        username: this.review.username,
                        reviewRating: this.review.reviewRating,
                        reviewDetail: this.review.reviewDetail,
                        reviewId: this.review.reviewId
                        }
                    );
                    console.log(this.review.restaurantId);
                })
                .catch(e => console.error(e))
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
            this.createReview();
        } else {
            this.updateReview();
        }
    }
    
    private createReview() {
        this.reviewDALService.insertReview(this.form.value, ()=> {
            console.log("Success: Record added successfully");
            alert("Success: Record added successfully");
        });
    }
    
    private updateReview() {
        console.log(this.form.value);
        this.reviewDALService.updateReview(this.form.value, ()=> {
            console.log("Success: Record review updated successfully");
            alert("Success: Record review updated successfully");
        });
    }
    
    deleteReview (reviewId: number) {
        const review = this.reviews.find(x => x.reviewId === reviewId);
        this.reviewDALService.deleteReview(review, () => {
            alert("Record review deleted successfully");
            this.router.navigateByUrl('/');
        });
    }
}
