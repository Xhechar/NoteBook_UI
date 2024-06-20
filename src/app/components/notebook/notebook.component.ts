import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-notebook',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.css'
})
export class NotebookComponent {
  display = {}
  
  changeDisplay() {
    this.display = {
      "display" : "flex"
    }
  }
}
