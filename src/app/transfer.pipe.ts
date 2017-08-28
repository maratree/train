import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transfer'
})
export class TransferPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return "--- "+value+" ---";
  }

}
