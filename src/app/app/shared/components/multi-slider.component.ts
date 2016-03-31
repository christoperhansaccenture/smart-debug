///<reference path="../nouislider/nouislider.d.ts" />
import {Component, AfterViewInit, ViewChild, Input, Output, EventEmitter, OnInit} from 'angular2/core';

@Component({
    selector: 'multi-slider',
    templateUrl: 'app/shared/components/multi-slider.component.html'
})
export class MultiSliderComponent implements AfterViewInit, OnInit {

    @ViewChild('sliderDomElement') sliderDomElement;
    minValue: Number;
    maxValue: Number;
    @Input() start: number[];
    @Input() range: Object = {min:0, max:100};
    @Output() slide: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.minValue = this.start[0];
        this.maxValue = this.start[1];
        console.log('initialize slider');
    }

    floor(value) {
        return Math.floor(value);
    }

    ngAfterViewInit() {
        let slider:any = this.sliderDomElement.nativeElement;
        noUiSlider.create(slider, {
            start: this.start,
            tooltips: [{to: this.floor}, {to: this.floor}],
            connect: true,
            range: this.range
        });
        let nus = slider.noUiSlider;
        nus.on('slide', this.myLogSlider);
    }

    public myLogSlider = (inValues: any[]) => {
        this.minValue = this.floor(inValues[0]);
        this.maxValue = this.floor(inValues[1]);
        this.slide.next([this.minValue, this.maxValue]);
    }

}
