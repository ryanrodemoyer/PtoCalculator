import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PtoConfiguration} from "../../ptoconfiguration";

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
    
    @Output()
    public calculate: EventEmitter<PtoConfiguration> = new EventEmitter<PtoConfiguration>();

    constructor() {
    }

    public run() {
        console.log(`run`);
        this.calculate.emit(this.config);
    }
}
