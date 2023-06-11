import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';
import { MustMatch } from '@app/_helpers';
import { DatabaseService } from '@app/_services/database.service';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    name:string='';
    price:string='';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private databseService:DatabaseService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            name: ['', Validators.required],
            price: ['', Validators.required],
        });

        this.title = 'Create Service';
        if (this.id) {
            // edit mode
            this.title = 'Edit Service';
            this.loading = true;
            this.databseService.getService(parseInt(this.id))
                .pipe(first())
                .subscribe(x => {
                    this.form = this.formBuilder.group({
                        title: ['Edit Service', Validators.required],
                        name: [x.data.name, Validators.required],
                        price: [x.data.price, Validators.required],
                    });
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    
    onSubmit() {
      

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
       

       

        // create or update account based on id param
        let saveAccount;
        let message: string;
        if (this.id) {
            let serviceData={name:this.form.controls.name.value,price:this.form.controls.price.value}
            saveAccount = () => this.databseService.updateService(parseInt(this.id!), serviceData);
            message = 'Account updated';
        } else {
            let serviceData={name:this.form.controls.name.value,price:this.form.controls.price.value}
            saveAccount = () => this.databseService.createService(serviceData);
            message = 'Account created';
        }

        saveAccount()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success(message, { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/admin/services');
                },
                error: error => {
                    this.alertService.error(error);
                   
                }
            });
    }
}