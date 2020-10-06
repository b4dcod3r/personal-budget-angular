import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public budget_labels = [];
  public budget_values = [];
  public myBudget_dict = {};

  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#232d82',
            '#ad3f0d',
            '#f0d658',
            '#ed9b98',
            '#227c52',
            '#b934f2',
            '#8b415a',
        ],
    }],
    labels: []
};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      for (var i = 0; i < res.data.myBudget.length; i++){
        this.budget_values.push(res.myBudget[i].budget);
        this.budget_labels.push(res.myBudget[i].label);
        this.myBudget_dict[String(res.myBudget[i].label)] = res.myBudget[i].budget;
        this.dataSource.datasets[0].data.push(res.myBudget[i].budget);
        this.dataSource.labels.push(res.myBudget[i].label);
        this.createChart(); 
      }  
    });
  } 
  createChart(){
    // var ctx = document.getElementById("pieChart").getContext("2d");
    var ctx = document.getElementById("pieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

}
