import { ChangeDetectionStrategy, Component, computed, inject, output } from '@angular/core';
import { CartStateService } from '../services/cart-state.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-confirm-order',
  imports: [CurrencyPipe],
  templateUrl: './confirm-order.component.html',
  styleUrl: './confirm-order.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmOrderComponent {

  private cartService = inject(CartStateService);
  cartStore = this.cartService.cartStore;

  close = output();

  closePopup() {
    this.close.emit();
  }

  startNewOrder() {
    this.cartService.clearCart(); // Clear the cart
    this.closePopup(); // Close the popup
  }

}
