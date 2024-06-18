import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Router } from '@angular/router';
import { UserInfo } from '../../../model/conversation';
import { TestyService } from '../../../service/testy.service';



interface CustomChartOptions extends ChartOptions<'pie'> {
  rotation: number
}

@Component({
  selector: 'app-gahca-titles',
  standalone: true,
  imports: [],
  templateUrl: './gahca-titles.component.html',
  styleUrl: './gahca-titles.component.css'
})
export class GahcaTitlesComponent {
  private wheel: Chart | undefined;
  private readonly rotationValues = [
    { minDegree: 0, maxDegree: 24, value: 'Python Puzzles' },
    { minDegree: 25, maxDegree: 48, value: 'Code Quest' },
    { minDegree: 49, maxDegree: 72, value: 'Syntax Safari' },
    { minDegree: 73, maxDegree: 96, value: 'Loop Legends' },
    { minDegree: 97, maxDegree: 120, value: 'Function Frenzy' },
    { minDegree: 121, maxDegree: 144, value: 'Object-Oriented Odyssey' },
    { minDegree: 145, maxDegree: 168, value: 'Data Structure Dash' },
    { minDegree: 169, maxDegree: 192, value: 'Variable Voyage' },
    { minDegree: 193, maxDegree: 216, value: 'Debudding Dungeon' },
    { minDegree: 217, maxDegree: 240, value: 'Algorithm Adventures' },
    { minDegree: 241, maxDegree: 264, value: 'Code Crafters' },
    { minDegree: 265, maxDegree: 288, value: 'Scripting Saga' },
    { minDegree: 289, maxDegree: 312, value: 'Byte Battle' },
    { minDegree: 313, maxDegree: 336, value: 'Function Forge' },
    { minDegree: 337, maxDegree: 360, value: 'Coding Chronicles' },
  ];
  private readonly data = Array(15).fill(1);
  private readonly pieColors = [
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
  ];

  finalValue: string = 'Good Luck!';
  isSpinning: boolean = false;
  userID: string = sessionStorage.getItem('id') as string
  user !: UserInfo

  constructor(private service: TestyService, private router: Router) {
    Chart.register(...registerables);
    this.service.get_profile(this.userID).subscribe(data => this.user = data)
  }

  ngOnInit(): void {
    this.createChart();
  }

  drawTitle() {
    if (+this.user.gaming_point < 500)
      alert("Insufficient Gaming Point")
    else {
      if (confirm("Spend 500 gaming point to draw a title ? "))
        this.spin();
    }
  }

  private createChart(): void {
    const wheelElement = document.getElementById('wheel') as HTMLCanvasElement;

    this.wheel = new Chart(wheelElement, {
      plugins: [ChartDataLabels],
      type: 'pie',
      data: {
        labels: ['Python Puzzles', 'Code Quest', 'Syntax Safari', 'Loop Legends',
          'Function Frenzy', 'Object-Oriented Odyssey', 'Data Structure Dash', 'Variable Voyage',
          'Debudding Dungeon', 'Algorithm Adventures', 'Code Crafters', 'Scripting Saga',
          'Byte Battle', 'Function Forge', 'Coding Chronicles'],
        datasets: [
          {
            backgroundColor: this.pieColors,
            data: this.data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
          datalabels: {
            color: "#ffffff",
            formatter: (_, context) => {
              const labels = context.chart.data.labels;
              if (labels) {
                return labels[context.dataIndex];
              }
              return '';
            },
            font: { size: 14 },
            clip: true,
            textAlign: 'center'
          },
        },
      },
    });
  }

  private valueGenerator(angleValue: number): void {
    for (let i of this.rotationValues) {
      if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
        this.finalValue = i.value;
        this.isSpinning = false;
        this.service.add_user_title(this.userID, this.finalValue).subscribe({
          next: (response) => {
            alert(`Congrat !! You got the ${this.finalValue} title !! ${response.success}`)
            window.location.reload()
          },
          error: (response) => {
            alert(response.error.failure)
            window.location.reload()
          }
        })
        break;
      }
    }
  }

  public spin(): void {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.finalValue = 'Good Luck!';

    let count = 0;
    let resultValue = 101;
    let randomDegree = Math.floor(Math.random() * 356);

    const rotationInterval = setInterval(() => {
      if (!this.wheel) return;

      const currentRotation = (this.wheel.options as CustomChartOptions).rotation ?? 0;
      (this.wheel.options as CustomChartOptions).rotation = currentRotation + resultValue;
      this.wheel.update();

      if ((this.wheel.options as CustomChartOptions).rotation >= 360) {
        count += 1;
        resultValue -= 5;
        (this.wheel.options as CustomChartOptions).rotation = 0;
      } else if (count > 15 && (this.wheel.options as CustomChartOptions).rotation === randomDegree) {
        this.valueGenerator(randomDegree);
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  }
}
