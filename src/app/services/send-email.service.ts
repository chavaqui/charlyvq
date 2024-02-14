import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

interface responseBodyMessage {
    name: string,
    email: string,
    message: string,
}
@Injectable({
  providedIn: 'root'
})
export class SendEmailService {
  vercelUrl = 'https://portfoliocharlyvq.vercel.app'
  backendUrl: string = this.vercelUrl +'/api'
  // backendUrl: string = 'http://localhost:3001/api'

  constructor(private httpClient: HttpClient) { }

  connectionToBackend(data: responseBodyMessage): Observable<any> {
    return this.httpClient.post(this.backendUrl,data);
  }
}
