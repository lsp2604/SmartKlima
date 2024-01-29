import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const influxQuery = `SELECT "temperature", "sensor_id" FROM "airSensors" WHERE ("sensor_id" = 'TLM0100' OR "sensor_id" = 'TLM0101') AND time >= '2024-01-24T11:30:00Z' AND time <= '2024-01-24T12:30:00Z`;
const url = 'http://localhost:8086';
const db = 'dev';
const authToken = 'Z_MFie7YJz00jtknyzZwlZXLr1S6bFRyTVpWIpSA52tOPSEUhdmcWpM2J850QZSC2lmGay9A0a7-ePAzLeECBg==\n'; // Replace with your authentication token


@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    // Define the headers with the authentication token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`,
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
      'mode': 'cors',
    });

    // Build the full URL
    const fullUrl = `${url}/query?db=${db}&q=${influxQuery}`;

    // Make the HTTP GET request with the headers
    return this.http.get(fullUrl, { headers });
  }
}
