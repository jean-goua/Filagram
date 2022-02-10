import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      email: '',
      password: ''
    });
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.userService.signUp(this.form.getRawValue().username, this.form.getRawValue().email, this.form.getRawValue().password).subscribe(res => {
      console.log(res.success);
      res.success == true ? this.toastrService.success('', 'Inscription réussite !') && this.router.navigate(['/login']) : this.toastrService.error('', "L'inscription a échoué");
    });
  }

  btnClick() {
    this.router.navigate(['/login']);
  }
}
