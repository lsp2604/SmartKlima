import { Injectable } from '@angular/core';
import {MqttService} from "ngx-mqtt";

@Injectable({
  providedIn: 'root'
})
export class DownlinkService {

  msg: any;
  // frm_payload = "";
  pushtopicname = 'v3/fhdw-gl-smart-campus@ttn/devices/eui-a81758fffe088b90/down/push';

  constructor(private _mqttService: MqttService) { }

  sendmsg(frm_payload:number): void {

    this.msg ='{"downlinks":[{"f_port": 1, "frm_payload":"' + frm_payload + '"}]}';
    // use unsafe publish for non-ssl websockets
    this._mqttService.unsafePublish(this.pushtopicname, this.msg, { qos: 1, retain: true});
    this.msg = '';
  }
}
