import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilitydesignService {
  isLoading= false;
  betPlaceData= new Subject<any>()
  setTvUrl= new Subject<any>()
  betPlaceListModal= new Subject<any>()
  MarketbetPlaceData= new Subject<any>()
  FancybetPlaceData= new Subject<any>()
  openBetByMatchId= new BehaviorSubject(0)
  constructor() { }
}
