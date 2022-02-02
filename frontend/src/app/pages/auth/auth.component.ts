import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onButtonClicked() {
    console.log("onButtonClicked");
    this.authService.testBackend().subscribe(result => { 
      console.log('YOUPI !');
    });
  }
}
