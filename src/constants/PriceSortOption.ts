import {OptionType} from "../types/OptionType.ts";

type PriceOptionsType = {
  LOW_TO_HIGH: OptionType,
  HIGH_TO_LOW: OptionType
}
export const PriceSortOption: PriceOptionsType =  {
  LOW_TO_HIGH: {
    id: '1',
    name: 'По убыванию'
  },
  HIGH_TO_LOW: {
    id: '2',
    name: 'По возрастанию'
  },
}

export const PriceOptionsArray = [PriceSortOption.LOW_TO_HIGH, PriceSortOption.HIGH_TO_LOW]