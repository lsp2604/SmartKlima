export const environment = {
  production: false,

  influxUrl : 'http://localhost:8086', // InfluxDB server URL
  influxToken : '1vcBILMgi1ssFpWoVcRFD6et1EC3RDiTIt1PfO3R-wv3JTJ8dnmer9hcKUYCnYW6wuMTNbT6uKH37lg8uY6icQ==', // InfluxDB authentication token
  influxOrg : 'SmartKlima_FHDW', // Your organization - adjust as needed
  influxBucket : 'test', // Your bucket - adjust as needed

  weatherUrl: 'https://api.openweathermap.org/data/2.5/weather',
  weatherApiKey: 'XXXXXX', // Ersetze DEIN_API_KEY mit deinem tatsächlichen API-Schlüssel
};
