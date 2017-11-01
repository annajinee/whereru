import {Pipe} from "@angular/core";
/**
 * Created by annakim on 2017. 4. 19..
 */

@Pipe({
  name: 'addcommaformat'
})
export class AddCommaFormat {
  transform(value: string ): string {
    return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
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
