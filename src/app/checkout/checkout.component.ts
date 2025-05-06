import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartStateService } from '../services/cart-state.service';
import { CartEmptyComponent } from "../cart-empty/cart-empty.component";
import { CurrencyPipe } from '@angular/common';
import { ConfirmOrderComponent } from "../confirm-order/confirm-order.component";

@Component({
  selector: 'app-checkout',
  imports: [CartEmptyComponent, CurrencyPipe, ConfirmOrderComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  private cartService = inject(CartStateService);
  cartStore = this.cartService.cartStore;

  isPopupVisible = false;

  increaseQuantity(dessertId: string) {
    this.cartService.increaseQuantity(dessertId);
  }

  decreaseQuantity(dessertId: string) {
    this.cartService.decreaseQuantity(dessertId);
  }

  removeDessert(dessertId: string) {
    this.cartService.removeDessertById(dessertId); // Call the service to remove the dessert
  }

  showPopup() {
    this.isPopupVisible = true;
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

}
