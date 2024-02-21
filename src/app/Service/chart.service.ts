import { Injectable } from '@angular/core';
import { InfluxDB } from '@influxdata/influxdb-client';
import { Observable } from 'rxjs';

const url = 'http://localhost:8086'; // InfluxDB server URL
const token = '8iyOClKQdBcQUhvZHPNtFHtxUfHXJFbJ71-3nM-S0qFidWPT_yIh6f21UC0p6OvzGFSY6vNBRiPwWtKwqslqjA=='; // InfluxDB authentication token
const org = 'SmartKlima_FHDW'; // Your organization - adjust as needed
const bucket = 'test'; // Your bucket - adjust as needed

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  fetchData(): Observable<any> {
    // Example: Aggregate windows every 1 hour
    const windowPeriod = '20m';

    const query = `from(bucket: "${bucket}")
      |> range(start: -24h)
      |> filter(fn: (r) => r["_measurement"] == "mqtt_consumer")
      |> filter(fn: (r) => r["_field"] == "uplink_message_decoded_payload_temperature")
      |> aggregateWindow(every: ${windowPeriod}, fn: mean, createEmpty: false)
      |> yield(name: "Measurements")`;

    const influxDB = new InfluxDB({ url, token });
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
