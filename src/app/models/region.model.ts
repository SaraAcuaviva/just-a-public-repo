/**
 * Basic region model
 * Author: Freddy Martínez
 */

 export class RegionModel{
    
    code: string;
    name: string;
    parentName: string;
    parentCode: string;
     
     constructor(
         code: string,
         name: string,
         parentCode?: string,
         parentName?: string
     ){
         this.code = code;
         this.name = name;
         this.parentCode = parentCode||" - ";
         this.parentName = parentName||" - ";
     }
 }
