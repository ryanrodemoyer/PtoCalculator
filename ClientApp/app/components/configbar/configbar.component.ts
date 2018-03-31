import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PtoConfiguration} from "../../ptoconfiguration";
import {Frequency} from "../../frequency";
import {Ending} from "../../ending";

@Component({
    selector: 'config-bar',
    templateUrl: './configbar.component.html',
    styleUrls: ['./configbar.component.css']
})
export class ConfigBarComponent {
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

    @Input()
    config: PtoConfiguration;
    
    m_startingHours: number | undefined;
    m_accrualRate: number | undefined;
    m_frequency: Frequency | undefined;
    m_startingDate: string | undefined;
    m_dayOfPayA: number | undefined;
    m_dayOfPayB: number | undefined;
    m_ending: Ending | undefined;
    
    @Output()
    public calculate: EventEmitter<PtoConfiguration> = new EventEmitter<PtoConfiguration>();

    constructor() {
        console.log(this.m_accrualRate);
    }

    public run() {
        // create a new instance to force change detection to run in other components
        let c = new PtoConfiguration();
        c.startingHours = this.m_startingHours as number;
        c.accrualRate = this.m_accrualRate as number;
        c.frequency = this.m_frequency as Frequency;
        c.startingDate = this.m_startingDate as string;
        c.dayOfPayA = this.m_dayOfPayA as number;
        c.dayOfPayB = this.m_dayOfPayB as number;
        c.ending = this.m_ending as Ending;
        
        // this.config = c;
        
        this.calculate.emit(c);
    }

    public loadDefaults(): void {
        this.m_startingHours = 15;
        this.m_accrualRate = 7;
        this.m_frequency = Frequency.SemiMonthly;
        this.m_startingDate = "2018-03-31";
        this.m_dayOfPayA = 6;
        this.m_dayOfPayB = 21;
        this.m_ending = Ending.PlusOne;
    }
    
    // public reset(): void {
    //     this.m_startingHours = undefined;
    //     this.m_accrualRate = undefined;
    //     this.m_frequency = undefined;
    //     this.m_startingDate = undefined;
    //     this.m_dayOfPayA = undefined;
    //     this.m_dayOfPayB = undefined;
    //     this.m_ending = undefined;
    //    
    //     this.calculate.emit(undefined);
    // }
}
