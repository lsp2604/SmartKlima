import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})


export class WeatherService {
  private baseUrl: string = environment.weatherUrl
  private apiKey: string = environment.weatherApiKey; // Ersetze DEIN_API_KEY mit deinem tatsächlichen API-Schlüssel


  constructor(private http: HttpClient) {}

  getWeather(lat: string, lon: string): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
