import {Ending} from "./ending";
import {Frequency} from "./frequency";

export class PtoConfiguration {
    public startingHours: number;
    public accrualRate: number;
    public frequency: Frequency;
    public dayOfPayA: number;
    public dayOfPayB: number;
    public startingDate: string;
    public ending: Ending;
}