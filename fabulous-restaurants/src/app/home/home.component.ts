import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    isLogin:Boolean = false;
    
    constructor(private accountService: AccountService) {
    }
    
    ngOnInit(): void {
        if (this.accountService.userValue) {
            this.isLogin = true;
        } else {
            this.isLogin = false;
        }
    }
}
