
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  imagen: any = '';
  imagen_path: any = '';
  ruta_aws:any = '';

  form_registro = new FormGroup({
    path: new FormControl(''),
    imagen: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    usuario: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    tipoUsuario: new FormControl('', Validators.required),
  });

  form_registro_viajes = new FormGroup({
    nombreAgencia: new FormControl('', Validators.required),
    ciudadOrigen: new FormControl('', Validators.required),
    ciudadDestino: new FormControl('', Validators.required),
    diasDeVuelo: new FormControl('', Validators.required),
    precioDeVuelo: new FormControl('', Validators.required),
  });

  form_registro_autos = new FormGroup({
    nombreAgencia: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    placa: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
  });

  usuarios = [
    // Aquí puedes agregar datos de prueba para la tabla de usuarios
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      usuario: 'juanperez',
      correo: 'juan@gmail.com',
      tipoUsuario: 'admin'
    },
  ];

  vuelos = [
    // Aquí puedes agregar datos de prueba para la tabla de historial de vuelos
    {
      id: 1,
      fecha: '10/11/2028',
      origen: 'Miami',
      destino: 'Mikasa',
      pasajeros: '10',
    },
  ];

  constructor(
    private http: UsuarioService,
    private router: Router,
    private authService: AuthService
  ){}

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log("=========Usuario actual:", this.currentUser);
  }

  submitUserForm() {
    console.log(this.form_registro);
    console.log(this.form_registro.valid);
    if(this.form_registro.valid){
      if(this.form_registro.value.password === this.form_registro.value.confirm_password){

        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
        if(this.imagen_path != ''){//validar imagen
          this.form_registro.value.imagen = this.imagen_path;
          this.form_registro.value.path = this.imagen.name;
          this.http.consult_post('/admin/registro', this.form_registro.value).subscribe({
            next: (data: any) => {
              if(data.status){
                debugger
                console.log('Usuario registrado');
                console.log(data.image)
                this.ruta_aws = data.image;
                Swal.fire({
                  title: 'Usuario registrado',
                  text: 'Usuario registrado correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
                this.router.navigate(['/login']);
              }else{
                Swal.fire({
                  title: 'Error al registrar usuario',
                  text: 'Error al registrar usuario',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
                console.log('Error al registrar usuario');
              }
            },
            error: (error: any) => {
              console.log(error.errors[0]);
              Swal.fire({
                title: 'Error al registrar usuario',
                text: 'La base de datos no responde :c',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al registrar usuario');
            }
          }
          );
        }else{
          alert('Formulario incompleto, imagen no agregada');
          console.log('Formulario incompleto');
        }
      }else{
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

  submitTripForm() {
    if (this.form_registro_viajes.valid) {
      console.log(this.form_registro_viajes.value);
      // Lógica para enviar el formulario
    }
  }

  submitCarForm() {
    if (this.form_registro_autos.valid) {
      console.log(this.form_registro_autos.value);
      // Lógica para enviar el formulario
    }
  }

  eliminarUsuario(id: string) {
    console.log('Eliminar usuario con ID:', id);
    // Lógica para eliminar el usuario
  }

  eliminarVuelo(id: string) {
    console.log('Eliminar vuelo con ID:', id);
    // Lógica para eliminar el vuelo
  }

  eliminar(id:any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
        Swal.fire('Usuario eliminado', 'Usuario eliminado correctamente', 'success');
      }
    });

  }

  // registrar(){
  //   console.log(this.form_registro);
  //   console.log(this.form_registro.valid);
  //   if(this.form_registro.valid){
  //     if(this.form_registro.value.password === this.form_registro.value.confirm_password){
        
  //       const index = this.imagen_path.indexOf(",");
  //       this.imagen_path = this.imagen_path.slice(index + 1);
  //       this.form_registro.value.imagen = this.imagen_path;
  //       this.form_registro.value.path = this.imagen.name;
  //       this.http.consult_post('/admin/registro', this.form_registro.value).subscribe({
  //         next: (data: any) => {
  //           if(data.status){
  //             debugger
  //             console.log('Usuario registrado');
  //             console.log(data.image)
  //             this.ruta_aws = data.image;
  //             Swal.fire({
  //               title: 'Usuario registrado',
  //               text: 'Usuario registrado correctamente',
  //               icon: 'success',
  //               confirmButtonText: 'Aceptar'
  //             });
  //             this.router.navigate(['/login']);
  //           }else{
  //             Swal.fire({
  //               title: 'Error al registrar usuario',
  //               text: 'Error al registrar usuario',
  //               icon: 'error',
  //               confirmButtonText: 'Aceptar'
  //             });
  //             console.log('Error al registrar usuario');
  //           }
  //         },
  //         error: (error: any) => {
  //           console.log(error.errors[0]);
  //           Swal.fire({
  //             title: 'Error al registrar usuario',
  //             text: 'La base de datos no responde :c',
  //             icon: 'error',
  //             confirmButtonText: 'Aceptar'
  //           });
  //           console.log('Error al registrar usuario');
  //         }
  //       }
  //       );
  //     }else{
  //       alert('Las contraseñas no coinciden');
  //       console.log('Las contraseñas no coinciden');
  //     }
  //   }else{
  //     alert('Formulario incompleto');
  //     console.log('Formulario incompleto');
  //   }
  // }

  onFileSelected(event: any){
    // Seleccionar el archivo y convertirlo a base64
    this.imagen = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      this.imagen_path = event.target.result;
    }
    reader.readAsDataURL(this.imagen);
  }

  encodeFileAsBase64(file:any){
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('loadend', () =>{
        resolve(reader.result);
      });
      reader.readAsDataURL(file);
    });
  }

  //cerrar sesion
  logout(): void {
    this.authService.logout(); // Implementa el método de cierre de sesión en el servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

}


