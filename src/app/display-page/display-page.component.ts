import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserdataService } from 'src/app/services/userdata.service';
import {AlertService} from 'src/app/services/alert.service';


@Component({ templateUrl: 'display-page.component.html' })
export class DisplayPageComponent implements OnInit {
    submitForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    currentUser: User;
    users = [];
    url: string;
    urlSafe: SafeResourceUrl;

    constructor(
        public sanitizer: DomSanitizer,
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
        this.userDataService.display()
            .pipe(first())
            .subscribe(
                data => {
                    console.log("Success")
                    this.url = data.url;
                    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
                    // this.router.navigate(['/display']);
                },
                error => {
                    console.log("Failure")
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => this.loadAllUsers());
    // }

    // private loadAllUsers() {
    //     this.userService.getAll()
    //         .pipe(first())
    //         .subscribe(users => this.users = users);
    // }

    // get f() { return this.submitForm.controls; }

//   onSubmit() {
//     this.submitted = true;

//     this.alertService.clear();

//     if (this.submitForm.invalid) {
//         return;
//     }

//     this.loading = true;
//     this.userDataService.submit(this.f.url.value, null)
//         .pipe(first())
//         .subscribe(
//             data => {
//                 console.log("Success")
//                 this.router.navigate(['/display']);
//             },
//             error => {
//                 console.log("Failure")
//                 this.alertService.error(error);
//                 this.loading = false;
//             });
//   }
}