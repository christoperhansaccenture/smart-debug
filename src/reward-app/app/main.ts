///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
import {Headers} from "angular2/http";

class MyOptions extends BaseRequestOptions {
    
  headers = new Headers(
             {'Content-Type': 'application/json'
            });

} 

bootstrap(AppComponent, [HTTP_PROVIDERS, provide(RequestOptions, {useClass: MyOptions})]);