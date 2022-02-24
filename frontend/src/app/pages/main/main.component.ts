import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: any;

  constructor(
    private route: Router,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.userService.getUser().subscribe(user => {
      console.log(user);
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  getUser(): void { // fonctionne pas, 'jwt must be provided'
    this.userService.getUser().subscribe(res => {
      console.log(res);
    });
  }

  logout(): void {
    this.userService.logout().subscribe(res => {
      this.toastrService.success('', 'Vous êtes déconnecté !');
      this.route.navigate(['login']);
    });
  }
}
