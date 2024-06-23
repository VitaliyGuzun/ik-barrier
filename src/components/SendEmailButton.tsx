import {useContext} from 'react'
import {TableContext} from '../store/TableContext'
import {formatPrice} from '../utils'
import {useParams} from '../hooks'

interface ISendEmailButton {
  toggleUserForm: () => void
}

export const SendEmailButton = ({toggleUserForm}: ISendEmailButton) => {
  const context = useContext(TableContext)
  const total = context.valuePrises.total[0]
  const amount = context.valueAmounts.total[0]
  const {isSendToEmail} = useParams()

  return (
    <div className="flex flex-col items-end gap-1">
      {!isSendToEmail && (
        <>
          <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-ikbrand-dark bg-ikbrand-light/50 ring-ikbrand/50">
            Количество: {amount}
          </span>
          <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ml-4 text-ikbrand-dark bg-ikbrand-light/50 ring-ikbrand/50">
            Итого: {total > 0 ? formatPrice(total) : ''}
          </span>
        </>
      )}
      {isSendToEmail && (
        <button
          onClick={toggleUserForm}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Итого: {formatPrice(total)}, {amount} шт.
          <br />
          Запросить расчет
        </button>
      )}
    </div>
  )
}
