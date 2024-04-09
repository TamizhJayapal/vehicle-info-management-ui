import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private url = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getVehicles() {
    return this.httpClient.get(this.url + "/get-all-vehicle");
  }

  getVehicle(id: any) {
    return this.httpClient.get(this.url + "/get-vehicle/" + id);
  }

  postVehicle(vehicle: any) {
    return this.httpClient.post(this.url + "/add-vehicle", vehicle);
  }

  putVehicle(id: any, vehicle: any) {
    return this.httpClient.put(this.url + "/update-vehicle/" + id, vehicle);
  }

  deletVehicle(id: any) {
    return this.httpClient.delete(this.url + "/delete-vehicle/" + id);
  }
}
