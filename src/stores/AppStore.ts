import products from '../data/items.json'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import {ProductType} from "../types/ProductType.ts";
export interface State {
  products: ProductType[]
}
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    }
  },
  actions: {
    getProducts({commit}) {
      try {
        const data: ProductType[] = JSON.parse(JSON.stringify(products))
        commit('setProducts', data);
      } catch (err) {
        const error = err as Error
        console.error('Error fetching data:', error.message);
      }
    }
  }
})
export function useStore () {
  return baseUseStore(key)
}