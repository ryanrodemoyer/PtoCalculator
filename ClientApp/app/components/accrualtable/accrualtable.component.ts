import {Component, Input} from "@angular/core";
import {PtoRow} from "../ptocalculator/ptocalculator.component";

@Component({
    selector: 'accrual-table',
    templateUrl: './accrualtable.component.html',
    // styleUrls: ['./accrualtable.component.css']
})
export class AccrualTableComponent {
    @Input()
    public data: Array<PtoRow>;

    constructor() {
    }
}