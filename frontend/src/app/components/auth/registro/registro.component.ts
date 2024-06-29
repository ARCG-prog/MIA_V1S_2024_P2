import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {

  constructor(
    private http: UsuarioService,
    private router: Router
  ){}

  // Lista de usuarios

  lista_usuarios = [
    {
      id: 1,
      nombre: 'Juan',
      apellido: 'Perez',
      usuario: 'juanperez',
      correo: 'juan@gmail.com'
    },
    {
      id: 2,
      nombre: 'Maria',
      apellido: 'Lopez',
      usuario: 'marialopez',
      correo: 'maria@gmail.com'
    },
    {
      id: 3,
      nombre: 'Pedro',
      apellido: 'Ramirez',
      usuario: 'pedroramirez',
      correo: 'pedro@gmail.com'
    },
    {
      id: 4,
      nombre: 'Ana',
      apellido: 'Gonzalez',
      usuario: 'anagonzalez',
      correo: 'ana@gmail.com'
    },
  ]

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
    confirm_password: new FormControl('', Validators.required)
  });

  // [
  //   Validators.minLength(8), 
  //   Validators.required,
  //   Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[.,:;!?(){}[\\]-_\'"ˋ~@#%^&*+=]).{8,}$')
  // ]

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
        this.lista_usuarios = this.lista_usuarios.filter((usuario) => usuario.id !== id);
        Swal.fire('Usuario eliminado', 'Usuario eliminado correctamente', 'success');
      }
    });

  }

  registrar(){
    if(this.form_registro.valid){
      if(this.form_registro.value.password === this.form_registro.value.confirm_password){
        
        const index = this.imagen_path.indexOf(",");
        this.imagen_path = this.imagen_path.slice(index + 1);
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
              // this.router.navigate(['']);
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
        alert('Las contraseñas no coinciden');
        console.log('Las contraseñas no coinciden');
      }
    }else{
      alert('Formulario incompleto');
      console.log('Formulario incompleto');
    }
  }

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

}
