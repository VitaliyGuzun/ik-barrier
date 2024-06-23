import {useContext} from 'react'
import {TableContext} from '../store/TableContext'
import {formatPrice} from '../utils'

export const useMessageForEmail = (): string => {
  const context = useContext(TableContext)

  const idsMap = []

  for (const [key, value] of Object.entries(context.valuePrises)) {
    if (key === 'total') continue

    if (value.length > 1 || value[0] > 0) {
      idsMap.push({
        id: key,
        sizes: value.map((value, index) => ({
          size: context.valueSizes[key][index],
          amount: context.valueAmounts[key][index],
          prise: value,
        })),
        total: value.reduce((acc, curr) => acc + curr, 0),
      })
    }
  }

  idsMap.unshift({
    id: 'total',
    prise: context.valuePrises.total[0],
    sizes: [{size: 0, amount: 0, prise: 0}],
  })

  const message = idsMap.reduce((acc, curr) => {
    if (curr.id === 'total' && curr.prise !== undefined) {
      return `${acc}\nИтого: ${formatPrice(curr.prise)}\n`
    }

    const model = curr.id

    const sizes = curr.sizes.reduce((acc, curr) => {
      return `${acc}\nРазмер: ${curr.size}, Количество: ${
        curr.amount
      } шт., Цена: ${formatPrice(curr.prise)}`
    }, '')

    return `${acc}\n${model}${sizes}\n`
  }, '')

  return message
}
