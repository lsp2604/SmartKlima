import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

// const influxQuery = `SELECT "temperature", "sensor_id" FROM "airSensors" WHERE ("sensor_id" = 'TLM0100' OR "sensor_id" = 'TLM0101') AND time >= '2024-01-24T11:30:00Z' AND time <= '2024-01-24T12:30:00Z`;
const influxQuery = `SELECT "uplink_message_decoded_payload_temperature" FROM "test"."autogen"."mqtt_consumer" `;
const url = 'http://localhost:8086';
const db = 'test';
const authToken = '8iyOClKQdBcQUhvZHPNtFHtxUfHXJFbJ71-3nM-S0qFidWPT_yIh6f21UC0p6OvzGFSY6vNBRiPwWtKwqslqjA=='; // Replace with your authentication token

// SELECT mean("uplink_message_decoded_payload_temperature") AS temp
// FROM "test"."autogen"."mqtt_consumer"
// WHERE time >= now() - 24h AND time <= now()
// GROUP BY time(20m)


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
    return this.http.get(fullUrl, {headers});
  }
}
