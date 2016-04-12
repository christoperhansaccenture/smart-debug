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
    @Input() type: string;
    @Input() start: number[];
    @Input() range = {min:0, max:100};
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
        
        console.log(this.type);
        
        if(this.type==='price'){
            noUiSlider.create(slider, {
                start: this.start,
                tooltips: [
                    {
                        to: function(value) {
                            
                            return 'P' + Math.floor(value);
                            
                        }
                    },
                    {to: function( value, start, settings ) {
                            
                            return 'P' + Math.floor(value);
                            
                        }
                    }],
                connect: true,
                range: this.range
                
            });
        }
        else if(this.type==='speed'){
            noUiSlider.create(slider, {
                start: this.start,
                tooltips: [
                    {
                        to: function(value) {
                            
                            return Math.floor(value) + ' Mbps';
                            
                        }
                    },
                    {to: function( value, start, settings ) {
                            
                            return Math.floor(value) + ' Mbps';
                            
                        }
                    }],
                connect: true,
                range: this.range
                
            });
            
        }else if(this.type==='quota'){
            noUiSlider.create(slider, {
                start: this.start,
                tooltips: [
                    {
                        to: function(value) {
                            
                            return Math.floor(value) + ' GB';
                            
                        }
                    },
                    {to: function( value, start, settings ) {
                        
                            if(value===1000){
                                return 'unlimited';
                            }else{
                                return Math.floor(value) + ' GB';
                            }           
                            
                        }
                    }],
                connect: true,
                range: this.range
                
            });
        }

        let nus = slider.noUiSlider;
        nus.on('slide', this.myLogSlider);
    }

    public myLogSlider = (inValues: any[]) => {
        
        this.minValue = this.floor(inValues[0]);
        this.maxValue = this.floor(inValues[1]);
        this.slide.next([this.minValue, this.maxValue]);
    }

}
