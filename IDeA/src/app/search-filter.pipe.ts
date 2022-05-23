import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(data:any){
        if (JSON.stringify(data).includes("fields")){
          return JSON.stringify(data.fields.dataset_id).toLowerCase().includes(args);
        }
        return JSON.stringify(data._destination).toLowerCase().includes(args)
    });
}

}
