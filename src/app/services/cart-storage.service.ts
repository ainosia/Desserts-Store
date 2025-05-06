import { Injectable } from '@angular/core';
import { CartStore } from './cart-state.service';

@Injectable({providedIn: 'root'})
export class CartStorageService {

  private readonly STORAGE_KEY = 'cart_state';

  loadState(): CartStore | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Failed to load cart state from localStorage', error);
      return null;
    }
  }

  saveState(state: CartStore): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save cart state to localStorage', error);
    }
  }

}
