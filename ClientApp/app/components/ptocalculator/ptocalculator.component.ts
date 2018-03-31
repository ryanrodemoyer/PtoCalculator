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
    
    constructor() {
    }
    
    public calculate(config: PtoConfiguration): void {
        this.config = config;
    }
}
