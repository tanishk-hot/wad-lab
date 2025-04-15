import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    dob: '',
    gender: '',
    address: '',
    email: '',
    contactNo: '',
    password: ''
  };
  

  constructor(private router: Router) {}

  ngOnInit(): void {
    //const isRegistered = localStorage.getItem('isRegistered');
    //if (isRegistered === 'true') {
   //   this.router.navigate(['/login']);
    //}
  }

  register(): void {
    localStorage.setItem('user', JSON.stringify(this.user));
    localStorage.setItem('isRegistered', 'true');
    this.router.navigate(['/login']);
  }
}