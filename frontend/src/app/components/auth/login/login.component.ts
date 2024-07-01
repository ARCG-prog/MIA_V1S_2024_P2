import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Verifica que esta ruta sea correcta y que el archivo exista
})
export class LoginComponent {
  //loginForm: FormGroup;
  //authservice = new AuthService();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // this.loginForm = this.fb.group({
    //   usuario: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      const username = ''+usuario;
      const pass = ''+password;
      this.authService.login(username, pass).subscribe(
        response => {
          console.log('Login successful', response);
          // Handle successful login, e.g., store user data, navigate to dashboard, etc.
        },
        error => {
          console.error('Login failed', error);
          // Handle login failure, e.g., show error message
        }
      );
    }
  }
}
