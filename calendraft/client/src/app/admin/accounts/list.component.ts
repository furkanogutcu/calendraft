import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { DatabaseService } from '@app/_services/database.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts?: any[];

    constructor(private accountService: AccountService,
        private databaseService:DatabaseService) { }

    ngOnInit() {
        this.databaseService.getAdmins()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts.data);
    }

    deleteAccount(id: string) {
        const account = this.accounts!.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts!.filter(x => x.id !== id)
            });
    }
}