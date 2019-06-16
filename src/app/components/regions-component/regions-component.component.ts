import { Component, Input, OnChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { RegionModel } from '../../models/region.model';

@Component({
  selector: 'regions-component',
  templateUrl: './regions-component.component.html',
  styleUrls: ['./regions-component.component.css'],
  animations: [
    trigger('myForTrigger', [
      transition(':enter', [
        style({ opacity: 0, height: '0px' }),
        animate('2s', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('0s', style({ opacity: 0, height: '0px' }))
      ])
    ])
  ]
})
export class RegionsComponentComponent implements OnChanges {

  @Input() rawText: string;
  departmentsList: Array<RegionModel>;
  provincesList: Array<RegionModel>;
  districtsList: Array<RegionModel>;
  private numRe = /^\d+/;

  constructor() {
  }

  ngOnChanges() {
    this.findRegions();
  }

  findRegions() {
    this.departmentsList = new Array<RegionModel>();
    this.provincesList = new Array<RegionModel>();
    this.districtsList = new Array<RegionModel>();
    let breaklineRe = /\n/;
    let lines = this.rawText.split(breaklineRe);
    lines.forEach(line => {
      line = line.replace(/[^a-zA-Z0-9 /]/g, "");     //removes special characters different from '/' and ' '
      if (line != undefined && line.length > 0) {
        line = line.trim();                           //removes whitespaces at the end of the line
        if (line.includes("/  /")) {
          this.addDepartment(line);
        } else if (line.endsWith("/")) {
          this.addProvince(line);
        } else {
          this.addDistrict(line);
        }
      }
    });
  }

  addDepartment(line: string) {
    let region: RegionModel;
    line = line.replace("/  /", "");
    region = new RegionModel(line.split(" ")[0], line.replace(this.numRe, "").trim());
    if (this.departmentsList.findIndex(reg => reg.code == region.code) < 0) {
      this.departmentsList.push(region);
    }
  }

  addProvince(line: string) {
    let regions = line.split("/");
    let dep = regions[0].trim();
    let prov = regions[1].trim();
    //to add the department to the list (in case it is not included), uncomment the following line
    // this.addDepartment(dep);
    let province: RegionModel = new RegionModel(prov.split(" ")[0], prov.replace(this.numRe, "").trim(), dep.split(" ")[0], dep.replace(this.numRe, "").trim())
    if (this.provincesList.findIndex(reg => reg.code == province.code) < 0) {
      this.provincesList.push(province);
    }
  }

  addDistrict(line: string) {
    let regions = line.split("/");
    let prov = regions[1].trim();
    let dist = regions[2].trim();
    let province: RegionModel = new RegionModel(dist.split(" ")[0], dist.replace(this.numRe, "").trim(), prov.split(" ")[0], prov.replace(this.numRe, "").trim());
    if (this.districtsList.findIndex(reg => reg.code == province.code) < 0) {
      this.districtsList.push(province);
    }
  }
}
