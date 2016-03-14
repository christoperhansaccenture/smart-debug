import {provide} from 'angular2/core';
import {HTTP_PROVIDERS, BaseRequestOptions, RequestOptions} from 'angular2/http';
import {Headers} from "angular2/http";

export class SmartRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Content-Type': 'application/json'
    });
}
