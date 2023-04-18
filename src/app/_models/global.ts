import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';

@Injectable()
export class Globals {
  static Url = environment.APIEndpoint;
  static Back = 'Back';
  static Lay = 'Lay';
  static paginatorPageSizeOptions=[5, 10, 25, 100,500];
  static paginatorPageSize=10;

}

