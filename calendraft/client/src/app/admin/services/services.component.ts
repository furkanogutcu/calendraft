import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { DatabaseService } from '@app/_services/database.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less']
})
export class ServicesComponent implements OnInit {
  services?: any[];

  constructor(private accountService: AccountService,
      private databaseService:DatabaseService) { }

  ngOnInit() {
      this.databaseService.getAllServices()
          .pipe(first())
          .subscribe(services =>{ 
            
            this.services = services.data
            console.log(this.services);

          } );
      
  }

  deleteAccount(id: string) {
      const account = this.services!.find(x => x.id === id);
      account.isDeleting = true;
      this.accountService.delete(id)
          .pipe(first())
          .subscribe(() => {
              this.services = this.services!.filter(x => x.id !== id)
          });
  }
}