import {Injectable} from 'angular2/core';
import {Http, Request, RequestOptions, RequestMethod, RequestOptionsArgs, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MyHttp {

    constructor(private _http: Http) {
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

    private _createAuthHeaders(): Headers {
        let headers: Headers = new Headers({
            'Content-Type': 'application/json'
        });
        let accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
        if (accessToken) {
            headers.append('Authorization', 'Bearer ' + accessToken)
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
            requestOptions.headers = this._createAuthHeaders();
        }
        return Observable.create((observer) => {
            this._http.request(new Request(requestOptions))
            .subscribe(
                (res) => {
                    observer.next(res);
                    observer.complete();
                },
                (err) => {
                    switch (err.status) {
                        case 403:
                            console.log('forbidden');
                            //TODO: refresh token and retry original call
                        /*
                            console.log('try issue another http call');
                            this._http.request(new Request(requestOptions))
                            .subscribe(
                                (res) => {
                                    console.log('retry success');
                                    observer.next(res);
                                    observer.complete();
                                },
                                (err) => {
                                    console.log('retry failed');
                                    observer.error(err);
                                }
                            );
                         */
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