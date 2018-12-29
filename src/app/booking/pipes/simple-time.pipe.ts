import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'simpleTime'
})
export class SimpleTimePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('h:mm a');
  }

}
