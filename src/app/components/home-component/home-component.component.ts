import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReversePipe } from '../../pipe/reverse.pipe';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule, ReversePipe, FormsModule, NavbarComponent, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  
}
