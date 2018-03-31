import {Component, EventEmitter, Input, Output} from "@angular/core";
import {PtoRow} from "../accrualtable/accrualtable.component";

@Component({
    selector: 'accrual-row',
    templateUrl: './accrualrow.component.html',
    // styleUrls: ['./accrualrow.component.css']
})
export class AccrualRowComponent {
    private _row: PtoRow;

    @Input()
    public get row(): PtoRow {
        return this._row;
    }

    public set row(value: PtoRow) {
        this._row = value;
    }

    @Output()
    public rowChanged: EventEmitter<PtoRow> = new EventEmitter<PtoRow>();

    constructor() {
    }

    public updateHandler(value: number) {
        if (value !== this.row.hoursUsed) {
            console.log(`control # ${this.row.id}, currentvalue=${this.row.hoursUsed}, newvalue=${value}`);
            this._row.hoursUsed = value;
            
            this.rowChanged.emit(this._row);
        }
    }
}