import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    user: User = null;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if the user is not an admin
        if (!(this.accountService.userValue.username === 'admin')) {
            this.router.navigateByUrl('/');
            alert("Only Admin can access to users page!");
        }
    }
    
    ngOnInit(): void {
    }
    
}
