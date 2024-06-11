import {useContext} from 'react'
import {TableContext} from '../store/TableContext'

interface IAmountInput {
  id: string
  index: number
}

export const AmountInput = ({id, index}: IAmountInput) => {
  const context = useContext(TableContext)
  const valueAmounts = context.valueAmounts[id]

  const onChange = ({target}: {target: HTMLInputElement}) => {
    const newValueAmounts = valueAmounts.map((item, i) =>
      i === index ? Number(target.value) : item,
    )
    context.setValueAmounts({...context.valueAmounts, [id]: newValueAmounts})
  }

  return (
    <div className="max-w-24">
      <label htmlFor="email" className="sr-only">
        Количество
      </label>
      <input
        onChange={onChange}
        value={valueAmounts[index] || ''}
        type="number"
        name="number"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-ikbrand-light focus:ring-ikbrand-light focus:ring-ikbrand-light sm:text-sm sm:leading-6 pl-3 outline-none"
        placeholder="0"
      />
    </div>
  )
}
