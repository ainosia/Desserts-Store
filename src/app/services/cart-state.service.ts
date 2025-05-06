import { computed, effect, inject, Injectable, signal } from '@angular/core';

import { Dessert } from '../interfaces/dessert.interface';
import { CartCalculatorService } from './cart-calculator.service';
import { CartStorageService } from './cart-storage.service';

export interface CartStore {
  desserts: Dessert[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartStore: CartStore = {
  desserts: [],
  totalAmount: 0,
  productsCount: 0
};

@Injectable({providedIn: 'root'})
export class CartStateService {

  private readonly _cartStorageService = inject(CartStorageService);
  private readonly _cartCalculatorService = inject(CartCalculatorService);

  private readonly _desserts = signal<Dessert[]>([]);
  readonly totalAmount = computed(() =>
    this._cartCalculatorService.calculateTotal(this._desserts())
  );
  readonly productsCount = computed(() =>
    this._cartCalculatorService.calculateItemsCount(this._desserts())
  );

  readonly cartStore = computed<CartStore>(() => ({
    desserts: this._desserts(),
    productsCount: this.productsCount(),
    totalAmount: this.totalAmount()
  }));

  constructor() {
    const savedState = this._cartStorageService.loadState();
    if (savedState) {
      this._desserts.set(savedState.desserts);
    }

    effect(() => this._cartStorageService.saveState(this.cartStore()));
  }

  addToCart(dessert: Dessert): void {
    const currentDesserts = this._desserts();
    const existingDessertIndex = currentDesserts.findIndex(
      (item: Dessert) => item.id === dessert.id
    );

    if (existingDessertIndex >= 0) {
      currentDesserts[existingDessertIndex] = {
        ...dessert,
        quantity: (currentDesserts[existingDessertIndex].quantity || 0) + 1
      };
      this._desserts.set(currentDesserts);
    } else {
      this._desserts.update((desserts: Dessert[]) => [
        ...desserts,
        { ...dessert, quantity: 1 }
      ]);
    }
  }

  increaseQuantity(dessertId: string): void {
    this._desserts.update((desserts) =>
      desserts.map((dessert) =>
        dessert.id === dessertId
          ? { ...dessert, quantity: (dessert.quantity || 1) + 1 }
          : dessert
      )
    );
  }

  decreaseQuantity(dessertId: string): void {
    this._desserts.update((desserts) =>
      desserts
        .map((dessert) =>
          dessert.id === dessertId && dessert.quantity! > 1
            ? { ...dessert, quantity: dessert.quantity! - 1 }
            : dessert
        )
        .filter((dessert) => dessert.quantity! > 0) // Remove items with quantity 0
    );
  }

  getDessertById(dessertId: string): Dessert | undefined {
    return this._desserts().find((dessert) => dessert.id === dessertId);
  }

  removeDessertById(dessertId: string): void {
    this._desserts.update((desserts) =>
      desserts.filter((dessert) => dessert.id !== dessertId)
    );
  }

  clearCart(): void {
    this._desserts.set([]);
  }

}
