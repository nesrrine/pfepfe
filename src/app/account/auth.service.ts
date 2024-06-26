import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8088/auth';

  constructor(private http: HttpClient) {}


  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/register`, data);
  }
  authenticate(data: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/authenticate`, data);
  }

  // Méthode pour activer le compte
  activateAccount(token: string): Observable<any> {
    // Le service ne retourne probablement pas de données, donc vous pouvez utiliser 'any' comme type de retour
    return this.http.get<any>(`${this.API_URL}/activate-account?token=${token}`);
  }

}
