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
    
    m_startingHours: number;
    m_accrualRate: number;
    m_frequency: Frequency;
    m_startingDate: string;
    m_dayOfPayA: number;
    m_dayOfPayB: number;
    m_ending: Ending;
    
    @Output()
    public calculate: EventEmitter<PtoConfiguration> = new EventEmitter<PtoConfiguration>();

    constructor() {
    }

    public run() {
        // create a new instance to force change detection to run in other components
        let c = new PtoConfiguration();
        c.startingHours = this.m_startingHours;
        c.accrualRate = this.m_accrualRate;
        c.frequency = this.m_frequency;
        c.startingDate = this.m_startingDate;
        c.dayOfPayA = this.m_dayOfPayA;
        c.dayOfPayB = this.m_dayOfPayB;
        c.ending = this.m_ending;
        
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
}
