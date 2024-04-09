import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.scss']
})
export class ListVehicleComponent implements OnInit {

  vehicles: any;
  vehiclesList: any;
  selectedOption = "all";
  searchString: string | undefined;
  options: { label: string, value: string }[] = [
    { label: 'All', value: 'all' },
    { label: 'Make', value: 'make' },
    { label: 'Model', value: 'model' },
    { label: 'Vin', value: 'vin' },
    { label: 'Year', value: 'year' }
  ];

  constructor(private service: VehicleService, private router: Router) { }

  ngOnInit() {
    this.service.getVehicles()
      .subscribe(response => {
        this.vehicles = response;
        this.vehiclesList = response;
        console.log(response);
      });
  }

  deleteVehicle(id: any) {
    this.service.deletVehicle(id).subscribe((res) => {
      this.vehicles = this.vehicles.filter((data: any) => id != data.id);
      this.vehiclesList = this.vehicles;
    })
  }

  onSelectionChange(): void {
    console.log('Selected option:', this.selectedOption);
    this.vehicles = this.vehiclesList;
    this.searchString = "";
  }

  search() {
    if (this.searchString == "") {
      this.vehicles = this.vehiclesList;
    }
    this.vehicles = this.vehiclesList.filter((data: any) => {
      if (this.selectedOption == "all") {
        if (data.make?.toLowerCase().includes(this.searchString?.toLowerCase()) ||
          data.model?.toLowerCase().includes(this.searchString?.toLowerCase()) ||
          data.vin?.toLowerCase().includes(this.searchString?.toLowerCase()) ||
          data.year.toString()?.toLowerCase().includes(this.searchString?.toLowerCase()))
          return data;
      } else {
        return data[this.selectedOption].toString()?.toLowerCase().includes(this.searchString?.toLowerCase());
      }
    });
  }
}
