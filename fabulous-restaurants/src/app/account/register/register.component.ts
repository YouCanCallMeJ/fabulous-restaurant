import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService) {
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            userId: ['']
        });
    }
    
    onSubmit() {
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    
        this.createUser();
    }
    
    private createUser() {
        this.accountService.register(this.form.value, ()=> {
            console.log("Success: Record user added successfully");
            alert("Success: Record user added successfully");
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
        });
    }
}
