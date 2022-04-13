import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
import {AlertService} from "../../services/alert.service";
import {AccountService} from "../../services/account.service";

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
    user: User = null;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private restaurantDatabaseService: RestaurantDatabaseService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
    }
    
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        this.isAddMode = !this.id;
    
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required]
            // id: ['']
        });
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
            console.log(this.form.value);
            this.createUser();
        } else {
            // this.updateUser();
        }
    }
    
    private createUser() {
        this.accountService.register(this.form.value, ()=> {
            console.log("Success: Record user added successfully");
            alert("Success: Record user added successfully");
        });
    }
}
