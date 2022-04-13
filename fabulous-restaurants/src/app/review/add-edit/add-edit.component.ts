import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../models/review.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
import {ReviewDALService} from "../../services/review-dal.service";
import {AlertService} from "../../services/alert.service";

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
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restaurantDatabaseService: RestaurantDatabaseService,
        private reviewDALService: ReviewDALService,
        private alertService: AlertService
    ) { }
    
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        this.isAddMode = !this.id;
    
        this.form = this.formBuilder.group({
            restaurantId: ['', Validators.required],
            userId: ['', Validators.required],
            reviewRating: ['', Validators.required],
            reviewDetail: ['', Validators.required],
            reviewId: ['']
        });
    
        if (!this.isAddMode) {
            this.reviewDALService.selectReview(this.id)
                .then(data => {
                    this.review = data;
                    this.form.patchValue({
                        restaurantId: this.review.restaurantId,
                        userId: this.review.userId,
                        reviewRating: this.review.reviewRating,
                        reviewDetail: this.review.reviewDetail,
                        reviewId: this.review.reviewId
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
}
