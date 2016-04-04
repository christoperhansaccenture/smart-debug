import {Component} from 'angular2/core';
import {ModalService} from '../../services/modal.service';

@Component({
    selector: 'billsetting-modal',
    templateUrl: 'app/shared/components/modal-includes/billsetting-modal.component.html'
})
export class BillSettingModalComponent {

    constructor(private _modalService: ModalService) {
    }

    close() {
        this._modalService.toggleBillSettingModal();
    }

}