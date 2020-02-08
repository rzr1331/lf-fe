import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserdataService } from 'src/app/services/userdata.service';
import {AlertService} from 'src/app/services/alert.service';


@Component({ templateUrl: 'home-page.component.html' })
export class HomePageComponent implements OnInit {
    submitForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: User;
    users = [];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userDataService: UserdataService,
        private alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        if (this.authenticationService.currentUserValue == null) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.submitForm = this.formBuilder.group({
            url: ['', Validators.required]
        });
    }

    get f() { return this.submitForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.submitForm.invalid) {
        return;
    }

    this.loading = true;
    this.userDataService.submit(this.f.url.value, null)
        .pipe(first())
        .subscribe(
            data => {
                console.log("Submit Succeeded"); 
                this.router.navigate(['/display']);
            },
            error => {
                console.log("Submit Failed");
                this.alertService.error(error);
                this.loading = false;
            });
  }
}