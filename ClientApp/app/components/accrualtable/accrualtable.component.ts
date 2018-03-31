import {Component, Input} from "@angular/core";
import {PtoConfiguration} from "../../ptoconfiguration";
import {Frequency} from "../../frequency";
import {Ending} from "../../ending";

export interface PtoRow {
    id: number;
    isStarting: boolean,
    accrualDate: Date | null,
    hoursUsed: number,
    currentAccrual: number,
}

class AccrualCalculator {
    constructor(private readonly config: PtoConfiguration) {
    }

    private static addMonths(date: Date, number: number) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + number);
        return result;
    }

    private static addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    private static setDate(date: Date, dayOfMonth: number) {
        const result = new Date(date);
        result.setDate(dayOfMonth);
        return result;
    }
    
    private rows: Array<PtoRow>;
    
    public Update(row: PtoRow): Array<PtoRow> {
        const results: Array<PtoRow> = [];
        
        const filtered = this.rows.filter(x => x.id !== row.id);
        filtered.push(row);
        
        let prev: PtoRow;

        filtered.sort((a, b) => a.id - b.id );
        
        filtered.forEach(x => {
            if (x.isStarting) {
                results.push(x);
                prev = x;
            }
            else {
                x.currentAccrual = prev.currentAccrual + this.config.accrualRate - x.hoursUsed;
                prev = x;
                results.push(x);
            }
        });
        
        return results;
    }

    public Calculate(): Array<PtoRow> {
        const rows = [];

        let accrual = this.config.startingHours;

        const startingRow: PtoRow = {
            id: 0,
            isStarting: true,
            accrualDate: null,
            hoursUsed: 0,
            currentAccrual: accrual,
        };

        rows.push(startingRow);

        const parts: Array<string> = this.config.startingDate.split('-');
        let currentDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

        let endDate: Date = new Date(new Date().getFullYear(), 12, 0);
        console.log(`endDate=${endDate}`);

        let addYears = 0;

        switch (this.config.ending) {
            case Ending.PlusOne:
                addYears = 1;
                break;
            case Ending.PlusTwo:
                addYears = 2;
                break;
            case Ending.PlusThree:
                addYears = 3;
                break;
        }

        endDate.setFullYear(endDate.getFullYear() + addYears);

        let counter = 0;
        while (currentDate <= endDate) {
            counter++;

            accrual += this.config.accrualRate;

            const row: PtoRow = {
                id: counter,
                isStarting: false,
                accrualDate: new Date(currentDate),
                hoursUsed: 0,
                currentAccrual: accrual,
            };

            rows.push(row);

            if (this.config.frequency == Frequency.BiWeekly) {
                currentDate = AccrualCalculator.addDays(currentDate, 14);
            }
            else {
                let day = currentDate.getDate();
                if (day >= this.config.dayOfPayB) {
                    // let updatedDate = AccrualCalculator.addMonths(currentDate, 1);
                    // updatedDate = AccrualCalculator.setDate(currentDate, days.a);
                    // currentDate = updatedDate;
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    currentDate.setDate(this.config.dayOfPayA);
                } else {
                    // currentDate = AccrualCalculator.setDate(currentDate, days.b);
                    currentDate.setDate(this.config.dayOfPayB);
                }
            }
        }

        this.rows = rows;
        
        return rows;
    }
}

@Component({
    selector: 'accrual-table',
    templateUrl: './accrualtable.component.html',
    styleUrls: ['./accrualtable.component.css']
})
export class AccrualTableComponent {
    private rows: Array<PtoRow>;

    private _config: PtoConfiguration;

    public get config(): PtoConfiguration {
        return this._config;
    }
    
    private _calc: AccrualCalculator;

    @Input()
    public set config(value: PtoConfiguration) {
        this._config = value;

        console.log(`event run in accrualtable = ${JSON.stringify(this.config)}`);

        if (value != null) 
        {
            this._calc = new AccrualCalculator(this.config);
            this.rows = this._calc.Calculate();
        }
    }

    constructor() {
    }
    
    public rowChangedHandler(row: PtoRow): void {
        console.log(`rowChangedHandler`);
        
        const rows = this._calc.Update(row);
    }
}