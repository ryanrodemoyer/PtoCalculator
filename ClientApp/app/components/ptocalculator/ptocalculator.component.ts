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
    public dayOfPayA: number;
    public dayOfPayB: number;
    public startingDate: string;
    public ending: Ending;
}

export interface PtoRow {
    isStarting: boolean,
    accrualDate: Date | null,
    hoursUsed: number | null,
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
            if (counter === 10) {
                // return rows;
            }
            
            accrual += this.config.accrualRate;

            const row: PtoRow = {
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

    frequencies: { value: string, display: string }[] = [
        {value: 'biweekly', display: 'Biweekly'},
        {value: 'semi-monthly', display: 'Semi-Monthly'},
    ];

    endings: { value: string, display: string }[] = [
        {value: 'current-year', display: 'Current Year'},
        {value: 'plus-one', display: '+1 Year'},
        {value: 'plus-two', display: '+2 Years'},
        {value: 'plus-three', display: '+3 Years'},
    ];

    model: PtoConfiguration = new PtoConfiguration();

    constructor() {
        const config = new PtoConfiguration();
        config.startingHours = 0;
        config.accrualRate = 7;
        config.frequency = Frequency.SemiMonthly;
        config.startingDate = "2018-01-02";
        config.dayOfPayA = 6;
        config.dayOfPayB = 21;
        config.ending = Ending.CurrentYear;

        this.rows = new AccrualCalculator(config).Calculate();
    }

    public run() {
        this.rows = new AccrualCalculator(this.model).Calculate();
    }
}
