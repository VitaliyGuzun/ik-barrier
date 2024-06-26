import {useCallback, useContext, useEffect, useState} from 'react'
import classNames from 'classnames'
import {HEADER} from '../constants/content'
import {
  AMOUNT_KEY,
  DESCRIPTION_KEY,
  ITablesWithIds,
  NAME_KEY,
  SIZE_KEY,
  TOTAL_KEY,
} from '../types'
import {TableContext} from '../store/TableContext'
import {RequestOfferButton} from './RequestOfferButton'
import {SuccessBanner} from './SuccessBanner'
import {UserForm} from './UserForm'
import {Row} from './Row'

export const Table = ({tables}: {tables: ITablesWithIds}) => {
  const context = useContext(TableContext)
  const total = context.valuePrises.total[0]
  const [isShowUserForm, setIsShowUserForm] = useState(false)
  const [isSended, setIsSended] = useState(false)

  useEffect(() => {
    if (isSended) {
      setTimeout(() => setIsSended(false), 60000)
    }
  }, [isSended])

  useEffect(() => {
    if (isShowUserForm && isSended) {
      setIsSended(false)
    }
  }, [isShowUserForm, isSended])

  const toggleUserForm = useCallback(() => {
    setIsShowUserForm(!isShowUserForm)
  }, [isShowUserForm])

  const toggleIsSended = () => setIsSended(true)

  return (
    <table className="min-w-full border-separate border-spacing-0">
      <thead>
        <tr>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
          >
            {HEADER[NAME_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
          >
            {HEADER[DESCRIPTION_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter text-end"
          >
            {HEADER[SIZE_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter  text-end"
          >
            {HEADER[AMOUNT_KEY]}
          </th>
          <th
            scope="col"
            className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
          >
            <div className="flex justify-between items-center">
              <div className="w-32 text-right">{HEADER[TOTAL_KEY]}</div>
              <div className="">
                {total > 0 && (
                  <RequestOfferButton
                    openUserForm={() => setIsShowUserForm(true)}
                  />
                )}
              </div>
            </div>
          </th>
        </tr>
        <tr className={classNames({hidden: !isShowUserForm})}>
          <th
            scope="col"
            className="sticky top-20 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8 text-right"
            colSpan={5}
          >
            <UserForm
              toggleUserForm={toggleUserForm}
              toggleIsSended={toggleIsSended}
            />
          </th>
        </tr>
        <tr className={classNames({hidden: !isSended})}>
          <th
            scope="col"
            className="sticky top-12 z-10 bg-white bg-opacity-75 text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
            colSpan={5}
          >
            <SuccessBanner />
          </th>
        </tr>
      </thead>
      {tables.map((table, index) => {
        return (
          <tbody key={index}>
            <tr className="border-t border-gray-200">
              <th
                colSpan={6}
                scope="colgroup"
                className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
              >
                {table.title}
              </th>
            </tr>
            {table.models.map((model, index) => {
              const isLast = index !== table.models.length - 1

              return <Row model={model} key={index} isLast={isLast} />
            })}
          </tbody>
        )
      })}
    </table>
  )
}
