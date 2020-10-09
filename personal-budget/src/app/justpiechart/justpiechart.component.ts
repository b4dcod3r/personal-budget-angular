import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'; 
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-justpiechart',
  templateUrl: './justpiechart.component.html',
  styleUrls: ['./justpiechart.component.scss']
})
export class JustpiechartComponent implements OnInit {

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
            '#8b415a'
        ],
    }],
    labels: []
  };

  createChart(){
    // var ctx = document.getElementById("pieChart").getContext("2d");
    var ctx = document.getElementById("pieChart");
    var myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataSource
    });
  }

  constructor(private MyDataService: DataService) { }

  ngOnInit(): void {
    this.MyDataService.getData().subscribe(res => {
      for (var i = 0; i < res["myBudget"].length; i++){
        this.dataSource.datasets[0].data.push(res["myBudget"][i].budget);
        this.dataSource.labels.push(res["myBudget"][i].label);
      }
      this.createChart();
    });
  }

}