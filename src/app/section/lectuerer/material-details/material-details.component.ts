import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-material-details',
  standalone: true,
  imports: [],
  templateUrl: './material-details.component.html',
  styleUrl: './material-details.component.css'
})
export class MaterialDetailsComponent implements OnInit{
  materialTitle: string | null = null;
  materialFilename: string |null = null;
  date: string | null = null;

  constructor(private route:  ActivatedRoute){}

  ngOnInit(): void{
    this.materialTitle = this.route.snapshot.paramMap.get('title');
    const encodedFilename = this.route.snapshot.paramMap.get('filename');
    this.materialFilename = encodedFilename ? decodeURIComponent(encodedFilename): null;
    const encodedDate = this.route.snapshot.paramMap.get('date');
    this.date = encodedDate ? decodeURIComponent(encodedDate) : null;
  }

}
