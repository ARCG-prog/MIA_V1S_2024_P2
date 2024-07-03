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
  selector: 'app-recepcionista',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterModule,
  ],
  templateUrl: './recepcionista.component.html',
  styleUrls: ['./recepcionista.component.scss']
})
export class RecepcionistaComponent implements OnInit {

  vuelos: any[] = [];

  autos: any[] = [];

  constructor(
    private http: UsuarioService,
    private router: Router,
    private authService: AuthService
  ){}

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log("=========Usuario actual:", this.currentUser);
    this.getCollection('Vuelos');
    this.getCollection('Autos');
  }

  getCollection(tipo: string){
    this.http.consult_get('/admin/get'+tipo).subscribe({
      next: (data: any) => {
        if(data.status){
          console.log(tipo+' tomados');
          if (tipo === 'Autos') {
            this.autos = data.data;
            console.log(this.autos);
          } else if (tipo === 'Vuelos') {
            this.vuelos = data.data;
            console.log(this.vuelos);
          }
        }else{
          Swal.fire({
            title: 'Error al error al recibir datos',
            text: 'Error',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.log('Error al recibir datos');
        }
      },
      error: (error: any) => {
        console.log(error.errors[0]);
        Swal.fire({
          title: 'Error al recibir datos',
          text: 'La base de datos no responde :c',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log('Error al recibir datos');
      }
    }
    );
  }


  eliminarDato(tipo: string,_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        //this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
        console.log('-------------------id: '+_id);
        this.http.consult_post('/admin/delete'+tipo, {id: _id}).subscribe({
          next: (data: any) => {
            if(data.status){
              console.log('Usuario eliminado');
              //mensaje de eiliminacion
              Swal.fire({
                title: tipo+' eliminado',
                text: tipo+' eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getCollection(tipo+'s');
              
            }else{
              Swal.fire({
                title: 'Error al error al eliminar ' +tipo,
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al eliminar ' +tipo);
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al eliminar ' +tipo,
              text: 'La base de datos no responde :c',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al eliminar ' +tipo);
          }
        }
        );
      }
    });
  }

  autorizarDato(tipo: string,_id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Estás seguro de que deseas reservar este dato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, reservar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        //this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
        console.log('-------------------id: '+_id);
        this.http.consult_post('/admin/autorizar'+tipo, {id: _id}).subscribe({
          next: (data: any) => {
            if(data.status){
              //console.log('Usuario eliminado');
              //mensaje de eiliminacion
              Swal.fire({
                title: tipo+' autorizado',
                text: tipo+' autorizado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
              this.getCollection(tipo+'s');
              
            }else{
              Swal.fire({
                title: 'Error al error al autorizar ' +tipo,
                text: 'Error',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              console.log('Error al autorizar ' +tipo);
            }
          },
          error: (error: any) => {
            console.log(error.errors[0]);
            Swal.fire({
              title: 'Error al autorizar ' +tipo,
              text: 'La base de datos no responde :c',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log('Error al autorizar ' +tipo);
          }
        }
        );
      }
    });
  }



  //cerrar sesion
  logout(): void {
    this.authService.logout(); // Implementa el método de cierre de sesión en el servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
  }

}


