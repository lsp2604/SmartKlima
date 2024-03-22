import {Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-downlink',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './downlink.component.html',
  styleUrl: './downlink.component.scss'
})

export class DownlinkComponent implements OnInit, OnDestroy{
  private subscription: Subscription = new Subscription();
  topicname: any;
  msg: any;
  frm_payload = "";
  pushtopicname = 'v3/fhdw-gl-smart-campus@ttn/devices/eui-a81758fffe088b90/down/push';
  @ViewChild('msglog', { static: true }) msglog!: ElementRef;


  constructor(private _mqttService: MqttService) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.endSubscription();
  }


  subscribeNewTopic(): void {
    console.log('inside subscribe new topic')
    this.subscription = this._mqttService.observe(this.topicname).subscribe((message: IMqttMessage) => {
      this.msg = message;
      console.log('msg: ', message)
      this.logMsg('Message: ' + message.payload.toString() + '<br> for topic: ' + message.topic);
    });
    this.logMsg('subscribed to topic: ' + this.topicname)
  }

  sendmsg(): void {

    this.msg ='{"downlinks":[{"frm_payload":"' + this.frm_payload + '"}]}';
    this._mqttService.unsafePublish(this.pushtopicname, this.msg, { qos: 1, retain: true});
    this.msg = '';
  }

  logMsg(message: string): void {
    this.msglog.nativeElement.innerHTML += '<br><hr>' + message;
  }

  clear(): void {
    this.msglog.nativeElement.innerHTML = '';
  }

  endSubscription(): void {
    this.subscription.unsubscribe();
    this.logMsg('unsubscribed from topic: ' + this.topicname)
  }

}





