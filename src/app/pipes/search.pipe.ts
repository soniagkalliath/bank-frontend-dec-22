import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransactions:any[],searchTerm:string,propertyName:string): any[] {
    //transformed output
    const result:any=[]
    if(!allTransactions || searchTerm=="" || propertyName==""){
      return allTransactions
    }
    allTransactions.forEach((item:any)=>{
      if(item[propertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
        result.push(item)
      }
    })
    return result;
  }

}
