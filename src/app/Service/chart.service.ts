import { Injectable } from '@angular/core';
import { InfluxDB } from '@influxdata/influxdb-client';
import { Observable } from 'rxjs';
import  { environment} from "../environments/environment";
import {HttpHeaders} from "@angular/common/http";

const url = environment.influxUrl; // InfluxDB server URL
const token = environment.influxToken; // InfluxDB authentication token
const org = environment.influxOrg; // Your organization - adjust as needed
const bucket = environment.influxBucket; // Your bucket - adjust as needed

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  fetchData(start:string, end:string): Observable<any> {
    // Example: Aggregate windows every 1 hour
    const windowPeriod = '20m';

    const query = `from(bucket: "${bucket}")
      |> range(start: ${start}, stop: ${end})
      |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
      |> filter(fn: (r) => r["_field"] == "uplink_message_decoded_payload_temperature")
      |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
      |> yield(name: "Measurements")`;

    const headers = {
      'Allow-Origin': '*' , // Allow cross-origin resource sharing
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Access-Control-Request-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Mode': 'no-cors',
      'Content-Type': 'application/vnd.flux',
    }

    const influxDB = new InfluxDB({ url, token, headers: headers});
    const queryApi = influxDB.getQueryApi(org);


    return new Observable(observer => {
      queryApi.queryRows(query, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row);
          observer.next(o);
        },
        error(error) {
          observer.error(error);
        },
        complete() {
          observer.complete();
        },
      });
    });
  }
}
