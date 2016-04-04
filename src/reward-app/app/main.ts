///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {enableProdMode, provide} from 'angular2/core';
import {Http, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
import {Headers, XHRBackend} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, Router, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {MyHttp} from './shared/services/my-http.service';


class MyOptions extends BaseRequestOptions {
    
  headers = new Headers(
             {'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('accessToken'))
            });

} 

enableProdMode();
bootstrap(AppComponent,[
	ROUTER_PROVIDERS,
	provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ROUTER_PROVIDERS,
	provide(APP_BASE_HREF, { useValue: getPath() }),
	HTTP_PROVIDERS, 
    provide(Http, {
        useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, _router: Router) => {
            let originalHttp = new Http(xhrBackend, requestOptions);
            //return new MyHttp(originalHttp);
            return new MyHttp(originalHttp, _router);
        },
        deps: [XHRBackend, RequestOptions, Router]
    })

]);

function getPath(){
	console.log(window.location.href);
	var str = window.location.href;
	var res = str.replace("index.html", "");
	console.log(res);
	return res;
}
