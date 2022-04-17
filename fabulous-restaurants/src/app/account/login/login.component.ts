import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from "../../services/account.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    submitted = false;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService) {
        
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
    
    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    
    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }
    
    onSubmit() {
        this.submitted = true;
        
        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }
    
        this.accountService.login(this.f['username'].value, this.f['password'].value)
            .then(() => {
                this.router.navigateByUrl('/');
            })
            .catch(error => console.error(error));
    }
}
