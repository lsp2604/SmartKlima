import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class WeatherService {
  private baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string = '7a7f0d24c850c8521dbae842820005db'; // Ersetze DEIN_API_KEY mit deinem tatsächlichen API-Schlüssel

  constructor(private http: HttpClient) {}

  getWeather(lat: string, lon: string): Observable<any> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
