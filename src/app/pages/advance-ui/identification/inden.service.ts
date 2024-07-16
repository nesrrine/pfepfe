import { CouvertureReseaux } from "./CouvertureReseaux.model";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programme } from './programme.model'; // Import Programme model if you have one
import { Gouvernorat } from './Gouvernorat.model';
import { Delegation } from './Delegation.model';
import { Quartier } from './Quartier.model';
import { Commune } from './commune.model';
import { DonneeGenerale } from './DonneeGenerale.model';
import { Logement } from './Logement.model';
import { LogementTypique } from './logement-typique.model';
import { LogementModerne } from './logement-moderne.model';
import { TypeReseau } from "./TypeReseau.model";
import { Observation } from "./Observation.model";
import { ProgrammeIntervention } from "./ProgrammeIntervention.model";
import { Infrastructurestype } from "./Infrastructurestype.model";
@Injectable({
  providedIn: 'root'
})
export class ProgrammeService {
  private baseUrl = 'http://localhost:8086/auth'; // Ajustez cette URL de base selon votre application Spring Boot

  constructor(private http: HttpClient) { }

  getAllProgrammes(): Observable<Programme[]> {
    return this.http.get<Programme[]>(`${this.baseUrl}/programmes`);
  }

  getProgrammeById(id: number): Observable<Programme> {
    return this.http.get<Programme>(`${this.baseUrl}/${id}`);
  }

  createProgramme(programme: Programme): Observable<Programme> {
    return this.http.post<Programme>(`${this.baseUrl}/programme`, programme);
  }

  updateProgramme(id: number, programmeDetails: Programme): Observable<Programme> {
    return this.http.put<Programme>(`${this.baseUrl}/programme/{id}`, programmeDetails);
  }

  deleteProgrammeById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
  
  getAllGouvernorats(): Observable<Gouvernorat[]> {
    return this.http.get<Gouvernorat[]>(`${this.baseUrl}/gouvernorats`);
  }

  getGouvernoratById(id: number): Observable<Gouvernorat> {
    return this.http.get<Gouvernorat>(`${this.baseUrl}/gouvernorats/${id}`);
  }

  createGouvernorat(gouvernorat: Gouvernorat): Observable<Gouvernorat> {
    return this.http.post<Gouvernorat>(`${this.baseUrl}/gouvernorat`, gouvernorat);
  }

  updateGouvernorat(id: number, gouvernoratDetails: Gouvernorat): Observable<Gouvernorat> {
    return this.http.put<Gouvernorat>(`${this.baseUrl}/gouvernorat/${id}`, gouvernoratDetails);
  }

  deleteGouvernoratById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/gouvernorat/${id}`);
  }

  getAllDelegations(): Observable<Delegation[]> {
    return this.http.get<Delegation[]>(`${this.baseUrl}/delegations`);
  }

  getDelegationById(id: number): Observable<Delegation> {
    return this.http.get<Delegation>(`${this.baseUrl}/delegations/${id}`);
  }

  createDelegation(delegation: Delegation): Observable<Delegation> {
    return this.http.post<Delegation>(`${this.baseUrl}/delegation`, delegation);
  }

  updateDelegation(id: number, delegation: Delegation): Observable<Delegation> {
    return this.http.put<Delegation>(`${this.baseUrl}/delegation/${id}`, delegation);
  }

  deleteDelegation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delegation/${id}`);
  }

  getDelegationsByGouvernaurat(gouvernauratId: number): Observable<Delegation[]> {
    return this.http.get<Delegation[]>(`${this.baseUrl}/delegations/gouvernorat/${gouvernauratId}`);
  }
  getAllCommunes(): Observable<Commune[]> {
    return this.http.get<Commune[]>(`${this.baseUrl}/communes`);
  }

  getCommuneById(id: number): Observable<Commune> {
    return this.http.get<Commune>(`${this.baseUrl}/communes/${id}`);
  }

  createCommune(commune: Commune): Observable<Commune> {
    return this.http.post<Commune>(`${this.baseUrl}/commune`, commune);
  }

  updateCommune(id: number, commune: Commune): Observable<Commune> {
    return this.http.put<Commune>(`${this.baseUrl}/commune/${id}`, commune);
  }

  deleteCommune(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/commune/${id}`);
  }
  getCommunesByDelegation(delegationId: number): Observable<Commune[]> {
    return this.http.get<Commune[]>(`${this.baseUrl}/delegations/${delegationId}/communes`);
  }
  getAllQuartiers(): Observable<Quartier[]> {
    return this.http.get<Quartier[]>(`${this.baseUrl}/quartiers`);
  }

  getQuartierById(id: number): Observable<Quartier> {
    return this.http.get<Quartier>(`${this.baseUrl}/quartiers/${id}`);
  }

  createQuartier(quartier: Quartier): Observable<Quartier> {
    return this.http.post<Quartier>(`${this.baseUrl}/quartier`, quartier);
  }

  updateQuartier(id: number, quartier: Quartier): Observable<Quartier> {
    return this.http.put<Quartier>(`${this.baseUrl}/quartier/${id}`, quartier);
  }

  deleteQuartier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/quartier/${id}`);
  }
  getQuartiersByCommune(communeId: number): Observable<Quartier[]> {
    return this.http.get<Quartier[]>(`${this.baseUrl}/communes/${communeId}/quartiers`);
  }
  createDonneesGenerales(donneegenerale: DonneeGenerale): Observable<DonneeGenerale> {
    return this.http.post<DonneeGenerale>(`${this.baseUrl}/DonneesGenerales`, donneegenerale);
  }
  
  calculateDensity(data: DonneeGenerale): Observable<number> {
    // Effectuer une requête au backend pour calculer la densité
    // Supposons que vous avez une route dans votre backend pour effectuer ce calcul
    return this.http.post<number>(`${this.baseUrl}/calculate-density`, data);
  }
  getAllLogements(): Observable<Logement[]> {
    return this.http.get<Logement[]>(`${this.baseUrl}/logements`);
  }

  createLogementTypique(logementTypique: LogementTypique): Observable<Logement> {
    return this.http.post<Logement>(`${this.baseUrl}/typiques`, logementTypique);
  }

  createLogementModerne(logementModerne: LogementModerne): Observable<Logement> {
    return this.http.post<Logement>(`${this.baseUrl}/modernes`, logementModerne);
  }
  getLogementById(id: number): Observable<Logement> {
    return this.http.get<Logement>(`${this.baseUrl}/logements/${id}`);
  }
  updateLogement(id: number, updatedLogement: Logement): Observable<Logement> {
    return this.http.put<Logement>(`${this.baseUrl}/logementss/${id}`, updatedLogement);
  }

  deleteLogement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/logement/${id}`);
  }

  
  getAllTypeReseaux(): Observable<TypeReseau[]> {
    return this.http.get<TypeReseau[]>(`${this.baseUrl}/types`);
  }

  getTypeReseauById(id: number): Observable<TypeReseau> {
    return this.http.get<TypeReseau>(`${this.baseUrl}/types/${id}`);
  }

  createTypeReseau(typeReseau: TypeReseau): Observable<TypeReseau> {
    return this.http.post<TypeReseau>(`${this.baseUrl}/types`, typeReseau);
  }

  deleteTypeReseauById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/types/${id}`);
  }

  getAllCouvertureReseaux(): Observable<CouvertureReseaux[]> {
    return this.http.get<CouvertureReseaux[]>(`${this.baseUrl}/couvertures`);
  }

  getCouvertureReseauById(id: number): Observable<CouvertureReseaux> {
    return this.http.get<CouvertureReseaux>(`${this.baseUrl}/couverture/${id}`);
  }
  

  createCouvertureReseaux(couvertureReseauxList: CouvertureReseaux[]): Observable<CouvertureReseaux[]> {
    return this.http.post<CouvertureReseaux[]>(`${this.baseUrl}/couvertures`, couvertureReseauxList);
  }

  deleteCouvertureReseauById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/couverture/${id}`);
  }
 
  
  getObservations(): Observable<Observation[]> {
    return this.http.get<Observation[]>(this.baseUrl);
  }

  getObservation(id: number): Observable<Observation> {
    return this.http.get<Observation>(`${this.baseUrl}/${id}`);
  }

  createObservation(observation: Observation): Observable<Observation> {
    return this.http.post<Observation>(this.baseUrl, observation);
  }

  updateObservation(id: number, observation: Observation): Observable<Observation> {
    return this.http.put<Observation>(`${this.baseUrl}/${id}`, observation);
  }

  deleteObservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  addIntervention(intervention: ProgrammeIntervention): Observable<ProgrammeIntervention> {
    return this.http.post<ProgrammeIntervention>(`${this.baseUrl}/addIntervention`, intervention);
  }

  getAllInterventions(): Observable<ProgrammeIntervention[]> {
    return this.http.get<ProgrammeIntervention[]>(`${this.baseUrl}/getAllInterventions`);
  }
  deleteProgrammeInterventionById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/ProgrammeIntervention/delete/${id}`)
    
  }
  getProgrammeInterventionById(id: number): Observable<ProgrammeIntervention> {
    return this.http.get<ProgrammeIntervention>(`${this.baseUrl}/ProgrammeIntervention/${id}`)
     
  }
  calculateTotalCost(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total`);
  }
  addType(type: Infrastructurestype): Observable<Infrastructurestype> {
    return this.http.post<Infrastructurestype>(`${this.baseUrl}/Infrastructurestype`, type);
  }

  getAllTypes(): Observable<Infrastructurestype[]> {
    return this.http.get<Infrastructurestype[]>(`${this.baseUrl}/Infrastructurestypes`);
  }
  deleteInfrastructureType(id: number): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/deleteInfrastructureType/${id}`);
  }

 
  getMarkers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
 
}
