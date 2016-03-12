import {Injectable} from 'angular2/core';
import {Headers,URLSearchParams} from "angular2/http";
import {BaseRequestOptions} from 'angular2/http';

@Injectable()
export class MyRequestOptions extends BaseRequestOptions {
  
  search = new URLSearchParams('coreTeam=true');
  
  headers = new Headers(
             {'Content-Type': 'application/json',
             'Authorization': 'Basic cG9zdHBhaWR3czp3c0BQMCR0cEAhRDEyMyE=',
             'X-session': sessionStorage.getItem('authorizationData')
            });

}