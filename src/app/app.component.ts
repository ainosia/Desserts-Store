import { Component } from '@angular/core';
import { DessertsComponent } from "./desserts/desserts.component";
import { CheckoutComponent } from "./checkout/checkout.component";

@Component({
  selector: 'app-root',
  imports: [DessertsComponent, CheckoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
