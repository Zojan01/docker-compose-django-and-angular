export class ProductTypeModel{

  id: string;
  fieldsName: string;
  fieldsType: string;
  name: string;

  constructor(obj? : any){
    this.id         = obj && obj.id || null;
    this.fieldsName = obj && obj.fieldsName || null;
    this.fieldsType = obj && obj.fieldsType || null;
    this.name       = obj && obj.name || null;
  }

}
