import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RestaurantDatabaseService} from "../../services/restaurant-database.service";
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
        private accountService: AccountService
    ) { }
    
    ngOnInit(): void {
        this.id = Number(this.route.snapshot.params['id']);
        this.isAddMode = !this.id;
    
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.minLength(6)],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userId: ['']
        });
    
        if (!this.isAddMode) {
            this.accountService.selectUser(this.id)
                .then(data => {
                    this.user = data;
                    this.form.patchValue({
                            username: this.user.username,
                            password: '',
                            firstName: this.user.firstName,
                            lastName: this.user.lastName,
                            userId: this.user.userId
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
    
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    
        if (this.isAddMode) {
            this.createUser();
        } else {
            this.updateUser();
        }
    }
    
    private createUser() {
        this.accountService.insertUser(this.form.value, ()=> {
            console.log("Success: Record user added successfully");
            alert("Success: Record user added successfully");
        });
    }
    
    private updateUser() {
        if (this.form.value.password === '') {
            this.form.value.password = this.user.password;
        }
        this.accountService.updateUser(this.form.value, ()=> {
            console.log("Success: Record user updated successfully");
            alert("Success: Record user updated successfully");
            this.user = this.form.value;
        });
    }
}
