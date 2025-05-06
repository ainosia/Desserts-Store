import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-empty',
  imports: [],
  templateUrl: './cart-empty.component.html',
  styleUrl: './cart-empty.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartEmptyComponent { }
