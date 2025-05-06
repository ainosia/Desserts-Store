import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DessertComponent } from "../dessert/dessert.component";
import { DessertService } from '../services/dessert.service';
import { Observable } from 'rxjs';
import { Dessert } from '../interfaces/dessert.interface';
import { AsyncPipe } from '@angular/common';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-desserts',
  imports: [DessertComponent],
  templateUrl: './desserts.component.html',
  styleUrl: './desserts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DessertsComponent {

  private dessertService = inject(DessertService);

  dessertsResource = rxResource({
    request: () => ({}),
    loader: ({ request }) => {
      return this.dessertService.getProducts();
    }
  });


  // private dessertsService = inject(DessertsService);
  // desserts = this.dessertsService.desserts;



}
