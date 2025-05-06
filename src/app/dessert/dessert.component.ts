import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Dessert } from '../interfaces/dessert.interface';
import { CartStateService } from '../services/cart-state.service';

@Component({
  selector: 'app-dessert',
  imports: [CurrencyPipe],
  templateUrl: './dessert.component.html',
  styleUrl: './dessert.component.css'
})
export class DessertComponent {

  private cartService = inject(CartStateService);
  dessert = input.required<Dessert>();
  selected = computed(() => {
    const dessertInCart = this.cartService.getDessertById(this.dessert().id);
    return !!dessertInCart; // True if dessert exists in the cart, false otherwise
  });
  quantity = computed(() => {
    const updatedDessert = this.cartService.getDessertById(this.dessert().id);
    return updatedDessert?.quantity || 0;
  });

  imageMobile = computed(() => `images/products/${this.dessert().image.mobile}`);
  imageTablet = computed(() => `images/products/${this.dessert().image.tablet}`);
  imageDesktop = computed(() => `images/products/${this.dessert().image.desktop}`);
  imageThumbnail = computed(() => `images/products/${this.dessert().image.thumbnail}`);

  onAddToCart() {
    this.cartService.addToCart(this.dessert());

    console.log(this.dessert());
  }

  increaseQuantity() {
    this.cartService.increaseQuantity(this.dessert().id);
  }

  decreaseQuantity() {
    this.cartService.decreaseQuantity(this.dessert().id);
  }

}
