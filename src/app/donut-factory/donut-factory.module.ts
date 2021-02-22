import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutFactoryComponent } from './donut-factory.component';
import { DonutFactoryRoutingModule } from './donut-factory-routing.module';



@NgModule({
	declarations: [
		DonutFactoryComponent
	],
	imports: [
		CommonModule,
		DonutFactoryRoutingModule
	]
})
export class DonutFactoryModule { }
