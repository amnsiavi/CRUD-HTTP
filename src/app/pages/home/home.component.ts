import { Component } from '@angular/core';

//Components
import { HeaderComponent } from '../../shared/header/header.component';
import { TableComponent } from '../../table/table.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
