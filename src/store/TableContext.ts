import * as React from 'react'
import {mapIds} from '../utils'
import {content} from '../constants/content'
import {PRISE_KEY} from '../types'

export type Values = Record<string, number[]>
export type ModelsPrises = Record<string, Record<number, number>>

type TableContextType = {
  valueSizes: Values
  setValueSizes: (sizes: Values) => void
  valueAmounts: Values
  setValueAmounts: (amounts: Values) => void
  valuePrises: Values
  clearValue: (id: string, index: number) => void
  addSize: (id: string) => void
}

export const contentWithIds = mapIds(content)
export const catalogPrises: ModelsPrises = {}
export const defaultValueSizes: Values = {}
export const defaultValueAmounts: Values = {}

contentWithIds.forEach((table) => {
  table.models.forEach((model) => {
    defaultValueAmounts[model.id] = [0]
    catalogPrises[model.id] = model[PRISE_KEY]

    if (Object.values(model[PRISE_KEY]).length === 1) {
      defaultValueSizes[model.id] = [Number(Object.keys(model[PRISE_KEY])[0])]
    } else {
      defaultValueSizes[model.id] = [0]
    }
  })
})

const defaultValue = {
  valueSizes: {},
  setValueSizes: ({}) => {},
  valueAmounts: {},
  setValueAmounts: ({}) => {},
  valuePrises: {},
  clearValue: () => {},
  addSize: () => {},
}

export const TableContext = React.createContext<TableContextType>(defaultValue)
