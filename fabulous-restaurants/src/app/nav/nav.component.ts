import {Component, OnInit} from '@angular/core';
import {AccountService} from "../services/account.service";

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    isLogin:Boolean = false;
    isAdmin:Boolean = false;
    
    constructor(private accountService: AccountService) {
    }
    
    ngOnInit(): void {
        if (this.accountService.userValue) {
            if (this.accountService.userValue.username === 'admin') {
                this.isAdmin = true;
            }
            this.isLogin = true;
        }
    }
    
    logout() {
        this.accountService.logout();
        this.isLogin = false;
        this.isAdmin = false;
    }
}
