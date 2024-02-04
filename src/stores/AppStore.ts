import products from '../data/items.json'
import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import {ProductType} from "../types/ProductType.ts";
import {PriceSortOption} from "../constants/PriceSortOption.ts";

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
        },
        filterProducts(state, data) {
            if (data == PriceSortOption.HIGH_TO_LOW.name) {
                state.products.sort((a, b) => +a.price.current_price - +b.price.current_price);
            } else {
                state.products.sort((a, b) => +b.price.current_price - +a.price.current_price);
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
            commit('filterProducts', sort.value);
        }
    }
})

export function useStore() {
    return baseUseStore(key)
}