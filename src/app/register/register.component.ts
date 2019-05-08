import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  login = true;
  registration = false;
  loading = false;
  submitted = false;
  message = '';
  error = '';

  constructor(  
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
    ) { }

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
          this.loading = false;
          this.submitted = false;
          const users = res.users;
          console.log(users);
          const user = users.filter(user =>
            user.username == this.loginForm.value.username
          );
          if(user.length){
            this.message = 'user is exist';
            this.router.navigate(['/home']);
          }else{
            this.error = 'Error! please try again!'
          }
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
      const body = this.registrationForm.value;
      this.loading = true;
      // this.registrationForm.reset();
  
      this.AuthService.addUser(body).subscribe(
        (res: any)=>{
          console.log('register', {res});
          this.loading = false;
          this.submitted = false;
          this.registrationForm.reset();
          this.router.navigate(['/validate-number']);
        },
        (err: Response)=>{
          console.log(err);
        }
      )
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
