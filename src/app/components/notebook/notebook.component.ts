import { Component, ViewChild, viewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Notebook } from '../../interfaces/interface';
import { FormsModule, NgForm } from '@angular/forms';
import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-notebook',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './notebook.component.html',
  styleUrl: './notebook.component.css'
})
export class NotebookComponent {
  requiredNotebookId: string = "";
  my_notebooks: Notebook[] = [];
  display = {};
  display2 = {};
  display3 = {};

  @ViewChild('updateForm') notebookUpdateForm!: NgForm;

  constructor () {
    this.fetchAllNotebooks();
  }

  setDisplayNone() {
    this.display = {
      "display" : "none"
    }
  }

  setDisplayNone2() {
    this.display2 = {
      "display" : "none"
    }
  }

  setDisplayNone3() {
    this.display3 = {
      "display" : "none"
    }
  }
  
  changeDisplay() {
    this.display = {
      "display" : "flex"
    }
  }

  changeDisplay2(notebook_id: string, notebook_title: string, notebook_content: string, notebook_date_created:string) {
    this.display2 = {
      "display" : "flex"
    }
    console.log(notebook_title + notebook_content + notebook_date_created);
    
    this.setValue(notebook_title, notebook_content, notebook_date_created);

    this.requiredNotebookId = notebook_id;
  }

  changeDisplay3(notebook_id: string) {
    this.display3 = {
      "display" : "flex"
    }

    localStorage.setItem('delete_id', notebook_id);
  }

  setValue(notebook_title: string, notebook_content: string, notebook_date_created:string) {
    this.notebookUpdateForm.setValue({
      notebook_title: notebook_title,
      notebook_content: notebook_content,
      notebook_date_created: notebook_date_created
    })
  }

  async displayValuesToBeUpdated(notebook: Notebook) {
    try {
      
      
      let updatedNotebook: Notebook = notebook as Notebook;

      let result = await fetch(`http://localhost:5303/notebooks/update-notebook/${this.requiredNotebookId}`, {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedNotebook)
      }).then(res => {
        return res.json()
      })

      this.setDisplayNone2();
      this.my_notebooks = [];
      this.fetchAllNotebooks();
      
    } catch (error) {
      
    }
  }

  async createNewNotebook(notebook: Notebook) {
    try {
      console.log(notebook);

      let newNotebook: Notebook = notebook as Notebook;

      const response = await fetch('http://localhost:5303/notebooks/new-notebook', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newNotebook)
      }).then(res => {
        return res.json()
      })

      this.setDisplayNone();
      this.my_notebooks = [];
      this.fetchAllNotebooks();
    } catch (error) {
      console.log("Error during fetching data from endpoint provided");   
    }
  }

  async fetchAllNotebooks() {
    
    try {
      
      let response = await fetch('http://localhost:5303/notebooks/all-notebooks', {
        method: 'GET',
        headers: {
          "content-type": "application/json",
        }
      }).then(res =>{
        return res.json()
      })

      let notebooks = response.projects;

      console.log(notebooks);

      for (let notebook in notebooks) {
        this.my_notebooks.push(notebooks[notebook])
      }
      
      

    } catch (error) {
      console.log("Error during fetching data from endpoint provided");      
    }

  }

  async deleteNoteBook() {
    try {
      let notebook_id = localStorage.getItem('delete_id') as string;

      console.log(notebook_id);

      let result = await fetch(`http://localhost:5303/notebooks/delete-notebook/${notebook_id}`, {
        method: 'DELETE'
      }).then(res => res.json());

      console.log(result);
      
      this.setDisplayNone3();
      localStorage.clear();
      this.my_notebooks = [];
      this.fetchAllNotebooks();
    } catch (error) {
      
    }
  }
}
