import { Component,OnInit } from '@angular/core';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    account = this.accountService.accountValue;


    constructor(private accountService: AccountService) { }
    ngOnInit(): void {
        console.log(this.account);
    }
}