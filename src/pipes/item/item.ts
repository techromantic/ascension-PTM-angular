import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ItemPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'item',
  pure: false
})
export class ItemPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, args: any[] = null): any {
    // create instance vars to store keys and final output
    let keyArr: any[] = Object.keys(value),
      dataArr = [];

    // loop through the object,
    // pushing values to the return array
    keyArr.forEach((key: any) => {
      dataArr.push(value[key]);
    });

    // return the resulting array
    return dataArr;
    // return Object.keys(value)//.map(key => value[key]);
  }
}
