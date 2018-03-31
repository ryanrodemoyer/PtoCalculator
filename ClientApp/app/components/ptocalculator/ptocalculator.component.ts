import {Component} from '@angular/core';
import {PtoConfiguration} from "../../ptoconfiguration";
import {Ending} from "../../ending";
import {Frequency} from "../../frequency";

@Component({
    selector: 'pto-calculator',
    templateUrl: './ptocalculator.component.html',
    styleUrls: ['./ptocalculator.component.css']
})
export class PtoCalculatorComponent {
    config: PtoConfiguration;
    
    // configForRows: PtoConfiguration;

    constructor() {
        const config = new PtoConfiguration();
        config.startingHours = 0;
        config.accrualRate = 7;
        config.frequency = Frequency.SemiMonthly;
        config.startingDate = "2018-01-02";
        config.dayOfPayA = 6;
        config.dayOfPayB = 21;
        config.ending = Ending.CurrentYear;
        
        this.config = config;
    }
    
    public calculate(config: PtoConfiguration): void {
        
        
        // this.configForRows = c;
        
        this.config = config;
        
        console.log(`event run = ${JSON.stringify(this.config)}`);
    }
}
