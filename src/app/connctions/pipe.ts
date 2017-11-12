import {Pipe} from "@angular/core";
/**
 * Created by annakim on 11/12/17.
 */

/**
 * Created by annakim on 2017. 4. 19..
 */

@Pipe({
    name: 'tonumber'
})
export class ChangeNumber {
    transform(value: string ): number {
        var changed = Number(value);
        console.log('cjange'+changed);
        return changed;
    }
}


@Pipe({
    name: 'addcommaformatnumber'
})
export class AddCommaFormatNumber {
    transform(value: number ): string {
        return String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
}