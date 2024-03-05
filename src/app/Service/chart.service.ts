import { Injectable } from '@angular/core';
import { InfluxDB } from '@influxdata/influxdb-client';
import { Observable } from 'rxjs';
import  { environment} from "../environments/environment";

const url = environment.influxUrl; // InfluxDB server URL
const token = environment.influxToken; // InfluxDB authentication token
const org = environment.influxOrg; // Your organization - adjust as needed
const bucket = environment.influxBucket; // Your bucket - adjust as needed

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  query: string = '';


  constructor() { }

  fetchData(start:string, end:string, custom:boolean): Observable<any> {
    // Example: Aggregate windows every 1 hour
    const windowPeriod = '60m';
    if(custom){
      this.query = `from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
        |> filter(fn: (r) => r["_field"] == "uplink_message_decoded_payload_temperature")
        |> aggregateWindow(every: 1d, fn: mean, createEmpty: false)
        |> yield(name: "Measurements")`;
    }
    else{
      this.query = `from(bucket: "${bucket}")
        |> range(start: ${start}, stop: ${end})
        |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
        |> filter(fn: (r) => r["_field"] == "uplink_message_decoded_payload_temperature")
        |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
        |> yield(name: "Measurements")`;
    }


    const influxDB = new InfluxDB({ url, token,});
    const queryApi = influxDB.getQueryApi(org);


    return new Observable(observer => {
      queryApi.queryRows(this.query, {
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
