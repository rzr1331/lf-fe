import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {AlertService} from 'src/app/services/alert.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit  {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
) {
    if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/home']);
    }
}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }


get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    this.alertService.clear();

    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
                console.log("Login Succeeded");  
                this.router.navigate(['/home']);
            },
            error => {
                console.log("Login Failed");
                this.alertService.error(error);
                this.loading = false;
            });
  }
}