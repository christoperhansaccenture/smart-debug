import {Component, Input} from 'angular2/core';

@Component({
    selector: 'horizontal-spinner',
    templateUrl: 'app/shared/components/spinners/horizontal-spinner.component.html'
})
export class HorizontalSpinnerComponent {

	@Input()
	color: string;

	getItemColor() {
		return (this.color) ? this.color : "green";
	}

	getItems() {
		let numbers: number[] = [1, 2, 3];
		return numbers;
	}

}