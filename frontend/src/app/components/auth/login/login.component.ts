import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
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
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login() {
    console.log("-------------soy el método log in--------------");
    //console.log(this.loginForm);
    if(this.loginForm.valid){
      //const { usuario, password } = this.loginForm.value;
      const usuario = ''+this.loginForm.value.username;
      const pass = ''+this.loginForm.value.password;
      console.log("Usuario: "+usuario );
      this.authService.login(usuario, pass).subscribe(
        response => {
          Swal.fire({
            title: 'Usuario ingresado',
            text: 'Usuario ingresado exitosamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          console.log('Login successful', response);
          // Handle successful login, e.g., store user data, navigate to dashboard, etc.
          //abrir otra componente de angular
        },
        error => {
          Swal.fire({
            title: 'Error ingresar usuario',
            text: 'Error. Datos no encontrados',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Login failed', error);
          // Handle login failure, e.g., show error message
        }
      );
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }
}
