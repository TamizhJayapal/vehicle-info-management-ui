import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {

  vehicleForm!: FormGroup;
  vehicle: any;

  constructor(private service: VehicleService, private route: ActivatedRoute, private router: Router) {
    this.vehicle = {} as any;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.service.getVehicle(id).subscribe(
          (response) => {
            console.log(response);
            this.vehicleForm.setValue(response);
          }
        )
      }
    })

    this.vehicleForm = new FormGroup({
      id: new FormControl(this.vehicle.id),
      vin: new FormControl(this.vehicle.vin, [
        Validators.required,
        Validators.minLength(17)
      ]),
      model: new FormControl(this.vehicle.model, [
        Validators.required,
      ]),
      year: new FormControl(this.vehicle.year, [
        Validators.required,
        Validators.minLength(4)
      ]),
      make: new FormControl(this.vehicle.make, [
        Validators.required,
      ]),
    });
  }


  get vin() {
    return this.vehicleForm.get('vin')!;
  }

  get model() {
    return this.vehicleForm.get('model')!;
  }

  get year() {
    return this.vehicleForm.get('year')!;
  }

  get make() {
    return this.vehicleForm.get('make')!;
  }

  public saveVehicle(): void {
    if (this.vehicleForm.invalid) {
      for (const control of Object.keys(this.vehicleForm.controls)) {
        this.vehicleForm.controls[control].markAsTouched();
      }
      return;
    }

    this.vehicle = this.vehicleForm.value;
    if (this.vehicle.id) {
      this.service.putVehicle(this.vehicle.id, this.vehicle).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    } else {
      this.service.postVehicle(this.vehicle).subscribe((res) => {
        this.router.navigate(['/list']);
      });
    }
  }
}
