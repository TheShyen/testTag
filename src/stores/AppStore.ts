import products from '../data/items.json'
import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import {ProductType} from "../types/ProductType.ts";
import {PriceSortOption} from "../constants/PriceSortOption.ts";
export interface State {
  products: ProductType[];
  shopCart: ProductType[];
  favorite: ProductType[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore({
    state: <State>{
      products: [],
      shopCart: [],
      favorite: []
    },
    mutations: {
        setProducts(state: State, data: ProductType[]) {
            state.products = data;
        },
        filterProductsByPrice(state: State, data: string) {
            if (data == PriceSortOption.HIGH_TO_LOW.id) {
                state.products.sort((a, b) => +a.price.current_price - +b.price.current_price);
            } else {
                state.products.sort((a, b) => +b.price.current_price - +a.price.current_price);
            }
        },
        filterProductsByMaterial(state: State, data: string) {
            state.products = state.products.filter((elem)=> elem.material == +data)
        },
      addProductToShopCart(state: State, data: ProductType) {
        state.shopCart.push(data)
        console.log(state.shopCart)
        localStorage.setItem('shopCart', JSON.stringify(state.shopCart))
      },
      addProductToFavorite(state: State, data: ProductType) {
        if (state.favorite.includes(data)) {
        } else {
          state.favorite.push(data)
          console.log(state.favorite)
          localStorage.setItem('favorite', JSON.stringify(state.favorite))
        }

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
        },
        sortProductsByPrice({commit},sort: {value: string}) {
            commit('filterProductsByPrice', sort.value);
        },
        filterProductsByMaterial({commit}, sort: {value: string}) {
            commit('filterProductsByMaterial', sort.value)
        },
      addProductToShopCart({commit}, product: ProductType) {
        commit('addProductToShopCart', product)
      },
      addProductToFavorite({commit}, product: ProductType) {
        commit('addProductToFavorite', product)
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}