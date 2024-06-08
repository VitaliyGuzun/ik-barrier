import {useMemo} from 'react'
import type {Values} from '../store/TableContext'
import {catalogPrises} from '../store/TableContext'

export const usePrises = (valueSizes: Values, valueAmounts: Values): any => {
  const result = useMemo(() => {
    const keys = Object.keys(valueSizes)
    let total = 0
    const obj: Values = {total: [0]}

    keys.forEach((key) => {
      const modelValueSizes = valueSizes[key]
      const modelValueAmounts = valueAmounts[key]
      const modelCatalogPrises = catalogPrises[key]

      modelValueSizes.forEach((size, index) => {
        const modelCatalogPrise = modelCatalogPrises[size]
        const modelValueAmount = modelValueAmounts[index]
        const prise =
          modelCatalogPrise !== undefined && modelValueAmount !== undefined
            ? modelCatalogPrises[size] * modelValueAmounts[index]
            : 0

        total = total + prise

        if (!obj[key]) {
          obj[key] = [prise]
        } else {
          obj[key] = [...obj[key], prise]
        }
      })
    })

    obj.total = [total]

    return obj
  }, [valueSizes, valueAmounts])

  return result
}
