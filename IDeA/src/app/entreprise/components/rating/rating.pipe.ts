import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingTitle'
})
export class RatingPipe implements PipeTransform {

  transform(value: number = 0, titles?: any): string {
    /** Initialize value with 0 in case of undefined */
    return titles[value] || value;
  }

}
