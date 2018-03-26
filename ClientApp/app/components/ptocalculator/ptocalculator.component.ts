import {Component} from '@angular/core';

export enum Frequency {
    BiWeekly = "biweekly",
    SemiMonthly = "semi-monthly",
}

export enum Ending {
    CurrentYear = "current-year",
    PlusOne = "plus-one",
    PlusTwo = "plus-two",
    PlusThree = "plus-three",
}

export class PtoConfiguration {
    public startingHours: number;
    public accrualRate: number;
    public frequency: Frequency;
    public startingDate: Date;
    public ending: Ending;
}

export interface PtoRow {
    isStarting: boolean,
    accrualDate: Date | null,
    hoursUsed: number | null,
    currentAccrual: number,
}

class AccrualCalculator {
    constructor(
        private readonly config: PtoConfiguration
    ) {
    }

    private static addDays(date: Date, days: number) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    public Calculate(): Array<PtoRow> {
        const rows = [];

        let accrual = this.config.startingHours;
        
        const startingRow: PtoRow = {
            isStarting: true,
            accrualDate: null,
            hoursUsed: null,
            currentAccrual: accrual,
        };

        rows.push(startingRow);

        let currentDate = new Date(this.config.startingDate);
        const endDate = new Date(2018, 12, 31);
        
        console.log(currentDate);
        console.log(endDate);
        while (currentDate <= endDate) {
            accrual += this.config.accrualRate;
            
            const row: PtoRow = {
                isStarting: false,
                accrualDate: currentDate,
                hoursUsed: 0,
                currentAccrual: accrual,
            };
            
            rows.push(row);
            
            currentDate = AccrualCalculator.addDays(currentDate, 14);
        }

        return rows;
    }
}

@Component({
    selector: 'pto-calculator',
    templateUrl: './ptocalculator.component.html',
    styleUrls: ['./ptocalculator.component.css']
})
export class PtoCalculatorComponent {
    rows: Array<PtoRow> = [];
    
    frequencies: {value: string, display: string}[] = [
        { value: 'biweekly', display: 'Biweekly'},
        { value: 'semi-monthly', display: 'Semi-Monthly'},
    ];
    
    endings: {value: string, display: string}[] = [
        { value: 'current-year', display: 'Current Year'},
        { value: 'plus-one', display: '+1 Year'},
        { value: 'plus-two', display: '+2 Years'},
        { value: 'plus-three', display: '+3 Years'},
        ];
    
    model: PtoConfiguration = new PtoConfiguration();
    
    constructor() {
        const config: PtoConfiguration = {
            startingHours: 55,
            accrualRate: 7,
            frequency: Frequency.SemiMonthly,
            startingDate: new Date(2018, 3, 21),
            ending: Ending.CurrentYear,
        };

        this.rows = new AccrualCalculator(config).Calculate();
    }
    
    public run() {
        // const config: PtoConfiguration = {
        //     startingHours: 10,
        //     accrualRate: 7,
        //     frequency: Frequency.SemiMonthly,
        //     startingDate: new Date(2018, 3, 25),
        //     ending: Ending.CurrentYear,
        // };

        console.log(this.model);
        const rows = new AccrualCalculator(this.model).Calculate();
        console.log(rows);
        this.rows = rows;
    }
}
