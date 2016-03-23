import {Component, OnInit} from 'angular2/core';
import {CatalogService} from '../services/catalog.service';
import {AccountService} from '../../shared/services/account.service';
import {ModalService} from '../../shared/services/modal.service';
import {StringTruncatePipe} from '../../shared/pipes/string-truncate.pipe';

@Component({
    selector: 'almost-get-item-belt',
    templateUrl: 'app/my-rewards/components/almost-get-item-belt.component.html',
    pipes: [
        StringTruncatePipe
    ]
})
export class AlmostGetItemBeltComponent implements OnInit {

	constructor (private _catalogService: CatalogService,
        private _modalService: ModalService,
        private _accountService: AccountService) {}

    ngOnInit() {
        this._catalogService.loadAllCatalogs();
    }

    getCategories() {
        let currentPoints = (this._accountService.selectedUserPhone.rewards) ? this._accountService.selectedUserPhone.rewards : 0;
        console.log(this._accountService.selectedUserPhone.rewards);
        if (this._catalogService.catalogs) {
            return this._catalogService.catalogs
                .filter(e => e.points > currentPoints)
                .slice(0, 11);
        }
        else
            return null;
    }

    openCatalogDisplay(catalog) {
        this._catalogService.selectedCatalog = catalog;
        this._modalService.toggleCatalogDisplayModal();
    }
    
}
