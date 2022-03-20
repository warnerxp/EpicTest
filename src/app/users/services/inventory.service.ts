import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  public xmlItems: any; 
  private resoruceUrl: string = 'assets/inventory.xml';
  constructor(private http: HttpClient) 
  {
    this.loadXML();
  }

  get getInventory() {
    return this.xmlItems;
}

  loadXML()
  {
   /*Read Data*/
    this.http.get(this.resoruceUrl,  
    {  
      headers: new HttpHeaders()  
        .set('Content-Type', 'text/xml')  
        .append('Access-Control-Allow-Methods', 'GET')  
        .append('Access-Control-Allow-Origin', '*')  
        .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),  
      responseType: 'text'  
    })  
    .subscribe((data) => {  
      this.parseXML(data)  
        .then((data) => {  
          this.xmlItems = data;  
        });  
    });  
          /*Read Data*/
}// end LoadXML

private parseXML(data) {  
  return new Promise(resolve => {  
    var k: string | number,  
      ProductArray: Product[] = [],
      arr  = [],  
      parser = new xml2js.Parser(  
        {  
          trim: true,  
          explicitArray: true  
        });  
    parser.parseString(data, function (err, result) {  
   
      var obj = result.inventory.products[0].product;
      //console.log(obj[1]);
       for (var i = 0; i < obj.length-2; i++) {
        var inventoryLine = obj[i]; 

          let product = {} as Product;
          product.name = inventoryLine.$.name,
          product.qty = inventoryLine.$.qty,
          product.price = inventoryLine.$.price
          ProductArray.push(product);
      } 
     resolve(ProductArray);  
    });  
  });  
}
}
