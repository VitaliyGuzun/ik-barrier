import {DESCRIPTION_KEY, IModelWithId, NAME_KEY, PRISE_KEY} from '../types'
import {SizeSelect} from './SizeSelect'
import {AmountInput} from './AmountInput'
import {TableContext} from '../store/TableContext'
import {useContext} from 'react'
import {formatPrice} from '../utils'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface IRow {
  model: IModelWithId
  index: number
  isLast: boolean
}

export const Row = ({model, index, isLast}: IRow) => {
  const isSizeAvailable = Object.keys(model[PRISE_KEY]).length > 1
  const context = useContext(TableContext)
  const valueSizes = context.valueSizes[model.id]
  const valueAmounts = context.valueAmounts[model.id]
  const modelTotals = context.valuePrises[model.id]

  return (
    <tr>
      <td
        className={classNames(
          isLast ? 'border-b border-gray-200 w-32' : '',
          'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8 w-32',
        )}
      >
        {model[NAME_KEY]}
      </td>
      <td
        className={classNames(
          isLast ? 'border-b border-gray-200 text-wrap max-w-6433' : '',
          'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell text-wrap max-w-6433',
        )}
      >
        {model[DESCRIPTION_KEY]}
      </td>
      <td
        className={classNames(
          isLast ? 'border-b border-gray-200 w-32' : '',
          'hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell w-32',
        )}
      >
        {isSizeAvailable && (
          <div className="flex flex-col gap-4">
            {valueSizes.map((_, index) => {
              return (
                <SizeSelect
                  key={index}
                  index={index}
                  sizes={model[PRISE_KEY]}
                  id={model.id}
                />
              )
            })}
          </div>
        )}
      </td>
      <td
        className={classNames(
          isLast ? 'border-b border-gray-200 w-32' : '',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-32',
        )}
      >
        <div className="flex flex-col gap-4">
          {valueAmounts.map((_, index) => {
            return <AmountInput key={index} id={model.id} index={index} />
          })}
        </div>
      </td>
      <td
        className={classNames(
          isLast ? 'border-b border-gray-200 w-1/4' : '',
          'whitespace-nowrap px-3 py-4 text-sm text-gray-500 w-1/4',
        )}
        colSpan={2}
      >
        <div className="flex flex-col gap-4">
          {modelTotals.map((total, index) => {
            const isLast = modelTotals.length - 1 === index

            return (
              <div
                key={index}
                className="flex w-full justify-between h-9 items-center"
              >
                <div>{total ? formatPrice(total) : ''}</div>
                <div>
                  {total > 0 && (
                    <button
                      type="button"
                      className="rounded bg-white px-2 py-1 text-xs text-gray-500 hover:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
                      onClick={() => context.clearValue(model.id, index)}
                    >
                      Очистить
                    </button>
                  )}
                  {total === 0 && !isLast && (
                    <button
                      type="button"
                      className="rounded bg-white px-2 py-1 text-xs text-gray-500 hover:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
                      onClick={() => context.removeSize(model.id, index)}
                    >
                      Удалить
                    </button>
                  )}
                  {isLast && (
                    <button
                      type="button"
                      className="rounded bg-white px-2 py-1 text-xs text-gray-500 hover:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-3"
                      onClick={() => context.addSize(model.id)}
                    >
                      Добавить размер
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </td>
    </tr>
  )
}
