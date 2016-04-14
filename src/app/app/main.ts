///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {enableProdMode, provide, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions, BrowserXhr} from 'angular2/http';
import {Headers, XHRBackend} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, Router, HashLocationStrategy} from 'angular2/router';
import {MyHttp} from './shared/services/my-http.service';
import 'rxjs/Rx';

declare var configChannel: any;
declare var configAppType: any;

class MyOptions extends BaseRequestOptions {
    
  headers = new Headers(
             {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            });

} 

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
    constructor() {
        super();
    }
    build(): any {
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any>(xhr);
    }
}

enableProdMode();
// bootstrap(AppComponent,[
//   	HTTP_PROVIDERS,provide(RequestOptions, {useClass: MyOptions})
// ]);

bootstrap(AppComponent,[
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: getPath() }),
	HTTP_PROVIDERS, 
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, _router: Router) => {
            let originalHttp = new Http(xhrBackend, requestOptions);
            return new MyHttp(originalHttp, _router);
        },
        deps: [XHRBackend, RequestOptions, Router]
    }),
    provide(BrowserXhr, { useClass: CustomBrowserXhr })
]);

function getPath(){
	console.log(window.location.href);
	var str = window.location.href;
	var res = str.replace("index.html", "");
    
    if(configChannel === 'web'){
        res = '/';
    }
    
	console.log(res);
	return res;
}
