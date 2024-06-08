import * as React from 'react'
import {Values} from '../store/TableContext'

export const useAmounts = (
  defaultAmounts: Values,
): [Values, React.Dispatch<React.SetStateAction<Values>>] => {
  const [valueAmounts, setValueAmounts] = React.useState(defaultAmounts)

  let total = 0
  const obj: Values = {total: [0]}

  const keys = Object.keys(valueAmounts).filter((key) => key !== 'total')

  keys.forEach((key) => {
    const values = valueAmounts[key].map((item) => Number(item))
    obj[key] = values
    total = total + values.reduce((acc, item) => acc + item, 0)
  })

  obj.total = [total]

  return [obj, setValueAmounts]
}
