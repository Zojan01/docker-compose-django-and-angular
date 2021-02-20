export class ProductModel{

  id: string;
  name: string;
  price: string;
  pathPoster:string;

  constructor(obj? : any){
    this.id         = obj && obj.id || null;
    this.name = obj && obj.name || null;
    this.price = obj && obj.price || null;
    this.pathPoster       = obj && obj.pathPoster || null;
  }


}
