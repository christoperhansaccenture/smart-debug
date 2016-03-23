import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'stringTruncate'
})
export class StringTruncatePipe implements PipeTransform {

    transform(value: string, args: string[]): any {
        let limit: number = +args[0];
        if (value.length < limit)
            return value;
        return value.substring(0, limit-1) + '...';
    }

}
