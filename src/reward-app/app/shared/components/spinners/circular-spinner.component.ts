import {Component, Input} from 'angular2/core';

@Component({
    selector: 'circular-spinner',
    templateUrl: 'app/shared/components/spinners/circular-spinner.component.html'
})
export class CircularSpinnerComponent {

	@Input()
	color: string;

	getItemColor() {
		return (this.color) ? this.color : "green";
	}

	getItems() {
		let numbers: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
		return numbers;
	}
}