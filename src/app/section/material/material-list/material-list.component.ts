import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TestyService } from '../../../service/testy.service';
import { MaterialDetailsComponent } from "../material-details/material-details.component";
import { Material } from '../../../model/material';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css',
  imports: [CommonModule, MaterialDetailsComponent, FormsModule]
})
export class MaterialListComponent {
  file !: File;
  userID: string = sessionStorage.getItem('id') as string
  role: string = sessionStorage.getItem('role') as string
  materials: Material[] = []
  selectedMaterial: any;
  showMaterialDetails: boolean = false;
  searchQuery !: string
  searching !: string

  filteredMaterials = [...this.materials]

  constructor(private router: Router, private service: TestyService) {
    if (this.role == "student")
      this.getAllMaterials()
    else
      this.getLecturerMaterials()
  }

  searchMaterial(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value
    this.filteredMaterials = this.materials.filter(material =>
      material.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }

  getFilePreview(name: string, type: string, file: string) {
    if (type === "application/pdf")
      return "../../../../assets/img/pdf.png"
    else if (name.endsWith('.doc') || name.endsWith('.docx'))
      return "../../../../assets/img/word.png"
    else if (name.endsWith('.ppt') || name.endsWith('.pptx'))
      return "../../../../assets/img/powerpoint.png"
    else if (type.startsWith('image/'))
      return `data:image/*;base64,${file}`
    else
      return "../../../../assets/img/file.png"
  }

  viewMaterialDetail(material: any) {
    this.selectedMaterial = material;
    this.showMaterialDetails = true;
  }

  backToList() {
    this.selectedMaterial = null;
    this.showMaterialDetails = false
  }

  getAllMaterials() {
    this.service.get_all_material().subscribe(data => this.materials = data)
  }

  getLecturerMaterials() {
    this.service.get_lecturer_material(this.userID).subscribe(data => this.materials = data)
  }

  uploadFile(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    fileInput.click();
  }

  fileUploaded(event: any): void {
    const file = event.target.files[0];
    this.file = file;

    const fileName = this.file.name;
    const fileType = this.file.type;
    const uploadDate = new Date().toISOString().slice(0, 10).replaceAll("-", "");

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileContentBase64 = e.target.result?.split(',')[1];

      const material = {
        "lecturerID": this.userID,
        "name": fileName,
        "type": fileType,
        "addedDate": uploadDate,
        "file": fileContentBase64
      }

      this.service.create_new_material(material).subscribe({
        next: (response) => {
          alert(response.success);
          window.location.reload();
        },
        error: (response) => alert(response.error.failure)
      })

    }
    reader.readAsDataURL(file);
  }



}