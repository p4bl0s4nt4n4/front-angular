import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { DatosService } from './datos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    RouterOutlet
  ],
  providers: [DatosService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'front-angular';
  datos!: MatTableDataSource<any>;
  cabecera_datos: string[] = ["id", "estado", "operador", "n_conexiones", "coordenadas", "pais"];
  
  @ViewChild(MatPaginator)
  paginador!: MatPaginator;

  @ViewChild(MatSort) 
  sort!: MatSort;

  constructor(private datosService:DatosService) {}

  ngAfterViewInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.datosService.getDatos().subscribe(d => {
      this.datos = new MatTableDataSource(d);
      this.datos.paginator = this.paginador;
      this.datos.sort = this.sort;
    })
  }

  aplicarFiltro(event:Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.datos.filter = valor.trim().toLocaleLowerCase();

    if (this.datos.paginator) {
      this.datos.paginator.firstPage();
    }
  }


}
