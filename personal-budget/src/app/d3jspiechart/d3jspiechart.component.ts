import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../data.service'; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'pb-d3jspiechart',
  templateUrl: './d3jspiechart.component.html',
  styleUrls: ['./d3jspiechart.component.scss']
})
export class PiechartComponent implements OnInit {

  public myBudget_dict = {};
  
  private svg;
  private margin = 50;
  private width = 750;
  private height = 600;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;

  private createColors(data: any): void {
    this.colors = d3.scaleOrdinal()
    .domain(data.map(d => d.budget.toString()))
    .range(["#232d82", "#ad3f0d", "#f0d658", "#ed9b98", "#b934f2",'#b934f2',"#8b415a"]);
  }

  private drawChart(data: any): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.budget));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#121926")
    .style("stroke-width", "1px");

    // Add labels
    const labelLocation = d3.arc()
    .innerRadius(100)
    .outerRadius(this.radius);

    this.svg
    .selectAll('pieces')
    .data(pie(data))
    .enter()
    .append('text')
    .text(d => d.data.label)
    .attr("transform", d => "translate(" + labelLocation.centroid(d) + ")")
    .style("text-anchor", "middle")
    .style("font-size", 15);
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );  
  }

  // constructor(private http: HttpClient, private newService: DataService) { }
  constructor(private MyDataService: DataService) { }
  
    ngOnInit(): void {

      this.MyDataService.getData().subscribe(data => {
        this.createSvg();
        this.createColors(data['myBudget']);
        this.drawChart(data['myBudget']); 

      });
    }

}