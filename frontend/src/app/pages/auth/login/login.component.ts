import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    console.log(this.form.getRawValue());
    this.userService.signIn(this.form.getRawValue().email, this.form.getRawValue().password).subscribe(res => {
      console.log(res.success);
      // res.success == true ? this.toastrService.success('', 'Connexion réussite !') : this.toastrService.error('', 'La connexion a échoué');

      if (res.success == true) {
        this.toastrService.success('', 'Connexion réussite !')
        this.router.navigate(['/home']);
      } else {
        this.toastrService.error('', 'Email ou Mot de passe incorrect !')
      }
    });
  }
}
