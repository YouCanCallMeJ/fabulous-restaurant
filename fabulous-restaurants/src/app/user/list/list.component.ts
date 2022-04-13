import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {User} from "../../models/user.model";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    users: User[] = null;
    
    constructor(private accountService: AccountService) {
    }
    
    ngOnInit(): void {
        this.accountService.selectAllUser()
            .then(data => this.users = data)
            .catch(error => console.log(error));
    }
    
    deleteUser(userId: number) {
    
    }
}
