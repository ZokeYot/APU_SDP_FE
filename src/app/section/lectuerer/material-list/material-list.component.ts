import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent {
  constructor(private router: Router){}



materials = [
    { title: 'Basic Syntax', filename: 'basic_syntax.pptx', date: '2024-04-25' },
    { title: 'Boolean Types', filename: 'boolean.pptx', date: '2024-05-02' },
    { title: 'Mathematical Operations', filename: 'math_operation.pptx', date: '2024-05-09' },
    { title: 'String', filename: 'string.pptx', date: '2024-05-16' },
    { title: 'Loop', filename: 'loop.pptx', date: '2024-05-16' },
    { title: 'Functions', filename: 'functions.pptx', date: '2024-05-30' }
  ]

navigateToMaterial(material: any) {
    const encodedFilename = encodeURIComponent(material.filename);
    const encodedDate = encodeURIComponent(material.date);
    this.router.navigate(['/material-details', material.title, encodedFilename, encodedDate]);
  }

}