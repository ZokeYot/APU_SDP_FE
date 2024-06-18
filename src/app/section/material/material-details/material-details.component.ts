import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestyService } from '../../../service/testy.service';
import { CommonModule } from '@angular/common';
import { Material } from '../../../model/material';


@Component({
  selector: 'app-material-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-details.component.html',
  styleUrl: './material-details.component.css'
})
export class MaterialDetailsComponent implements OnInit {
  @Input() material !: Material
  ownerName !: string
  role: string = sessionStorage.getItem('role') as string

  constructor(private service: TestyService, private router: Router) {
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


  ngOnInit(): void {
    this.service.get_profile(this.material.lecturerID).subscribe(data => this.ownerName = data.name)
  }

  download(material: Material) {
    const link = document.createElement('a');
    link.href = `data:${material.type};base64,${material.file}`;
    link.download = material.name;
    link.click();
  }

  delete(materialID: any) {
    const result = confirm("Are you sure want to delete the material ??? ")

    if (result) {
      this.service.delete_material(materialID).subscribe({
        next: (response) => {
          alert(response.success)
          window.location.reload();
        },
        error: (response) => alert(response.error.failure)
      })
    }
  }

}
