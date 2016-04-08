///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { enableProdMode, provide } from 'angular2/core';
import { Http, HTTP_PROVIDERS, BaseRequestOptions, RequestOptions } from 'angular2/http';
import { Headers, XHRBackend } from "angular2/http";
import { ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, Router, HashLocationStrategy } from 'angular2/router';

bootstrap(AppComponent);
