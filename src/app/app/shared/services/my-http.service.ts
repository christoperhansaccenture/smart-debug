import {Injectable} from 'angular2/core';
import {Http, Request, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Router} from 'angular2/router';

declare var configChannel: any;

@Injectable()
export class MyHttp {
    serviceBase: string;
    timeout: number;		 

    constructor(private _http: Http,		
                private _router: Router) {		

                    const url = 'services/api.json';		
                    this._http.get(url,		
                                   <RequestOptionsArgs> {		
                                       headers: new Headers({		
                                           'Content-Type': 'application/x-www-form-urlencoded',		
                                       })		
                                   })		
                                   .subscribe(file => {		
                                       let config = file.json().config;		
                                       this.serviceBase = config.baseUrl;	
                                       this.timeout = Number(config.timeout);	
                                   });		
    }


    public get(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Get, url, null, options);
    }

    public post(url: string, body: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Post, url, body, options);
    }

    public put(url: string, body: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Put, url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs) {
        return this._request(RequestMethod.Delete, url, null, options);
    }

    private _createAuthHeaders(method: RequestMethod): Headers {
        let headers: Headers = new Headers();
        if (method != RequestMethod.Get) {
            headers.append('Content-Type', 'application/json');        
        }
        if (configChannel !== 'web') {
            let accessToken = localStorage.getItem('accessToken');
            if (accessToken) {
                headers.append('Authorization', 'Bearer ' + accessToken)
            }
        }
        return headers;
    }

    private _request(method: RequestMethod, url: string, body?: string, options?: RequestOptionsArgs): Observable<any> {
        let requestOptions = new RequestOptions({
            method: method,
            url: url,
            body: body
        });
        if (options) {
            for (let attrname in options) {
                requestOptions[attrname] = options[attrname];
            }
        } else {
            requestOptions.headers = this._createAuthHeaders(method);
        }
        return Observable.create((observer) => {
            this._http.request(new Request(requestOptions))
            .timeout(this.timeout,{status:408})
            .subscribe(
                (res) => {
                    observer.next(res);
                    observer.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 403:
                            console.log('forbidden');

                        const refreshToken: string = localStorage.getItem('refreshToken');
                        const url: string = this.serviceBase + '/token/renew';
                        if (refreshToken) {
                            let data = {
                                "refreshToken": refreshToken
                            };
                            this._http.post(url, JSON.stringify(data))
                            .timeout(this.timeout,{status:408})
                            .subscribe(
                                response => {
                                    localStorage.setItem('accessToken', response.json().accessToken);
                                    // do original call
                                    return Observable.create((observer) => {
                                        this._http.request(new Request(requestOptions))
                                        .timeout(this.timeout,{status:408})
                                        .subscribe(
                                            (res) => {
                                                console.log('retry success');
                                                observer.next(res);		
                                                observer.complete();		
                                            },		
                                            (err) => {		
                                                console.log('retry failed');		
                                                observer.error(err);		
                                            })		
                                    });		
                                },		
                                error => {		
                                    localStorage.removeItem('accessToken');		
                                    localStorage.removeItem('refreshToken');		
                                    this._router.navigate(['Starter','Login']); // router might not work, need more tests		
                                }		
                            );		
                        }
                        observer.error(err);
                        break;
                        default:
                            observer.error(err);
                        break;
                    }
                })
        });
    }
}
