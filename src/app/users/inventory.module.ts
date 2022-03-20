import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { InventoryService } from './services/inventory.service';
import {HttpClientModule} from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    InventoryComponent
  ],
  exports:[
    InventoryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatSliderModule,
    MatTableModule
    
  ],
  providers:[
    InventoryService
  ]
})
export class InventoryModule { }
