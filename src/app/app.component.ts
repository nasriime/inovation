import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  loginForm: FormGroup;
  registrationForm: FormGroup;
  login = true;
  registration = false;
  loading = false;
  submitted = false;
  error = '';


  constructor(
    private formBuilder: FormBuilder,
    private AuthService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
        password: ['', Validators.required]
    });

    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [''],
      number: ['',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(8)
      ]],
      address: ['', Validators.required],
      authentication: ['Password'],
      password: ['', Validators.required]
    });

    this.conditionalNumber();
  }

  get l() { return this.loginForm.controls; }
  get r() { return this.registrationForm.controls; }

  onLoginSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.loading = true;
     this.AuthService.getUser().subscribe(
      (res: any)=>{
        const users = res.users;
        const user = users.filter(user =>
          user.username == this.loginForm.value.username
        );
        console.log(user);
        this.loading = false;
        this.submitted = false;
        this.loginForm.reset();
      },
      (err: Response) =>{
        console.log(err);
      }
    )
  }

  onRegistrationSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
        return;
    }

    console.log(this.registrationForm.value);
    const body = this.registrationForm.value
    console.log(body);

    this.loading = true;
    // this.registrationForm.reset();

    // this.AuthService.addUser().subscribe(
    //   (res: any)=>{
    //     console.log(res);
    //     this.loading = false;
    //   },
    //   (err: Response) =>{
    //     console.log(err);
    //   }
    // )
  }

  conditionalNumber() {
    const number = this.registrationForm.get('number');

    this.registrationForm.get('email').valueChanges
      .subscribe(email => {

        if (email == '') {
          number.setValidators([Validators.required]);
        }

        if (email.length > 0) {
          number.setValidators(null);
        }

        number.updateValueAndValidity();
      });
  }


}
