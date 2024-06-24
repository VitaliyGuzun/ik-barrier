import {useContext, useRef, useState} from 'react'
import {useMessageForEmail} from '../hooks/useMessageForEmail'
import * as api from '../api'
import {EnvelopeIcon, ArrowPathIcon} from '@heroicons/react/20/solid'
import {TableContext} from '../store/TableContext'

interface IUserForm {
  toggleUserForm: () => void
  toggleIsSended: () => void
}

export const UserForm = ({toggleUserForm, toggleIsSended}: IUserForm) => {
  const context = useContext(TableContext)
  const nameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const message = useMessageForEmail()
  const [isPending, setIsPending] = useState(false)

  const sendEmail = async () => {
    setIsPending(true)
    const name = nameRef.current?.value ?? ''
    const phone = phoneRef.current?.value ?? ''
    const email = emailRef.current?.value ?? ''
    const user = {name, phone, email}
    try {
      await api.sendEmail({user, message})
      setTimeout(toggleIsSended, 0)
      setTimeout(toggleUserForm, 0)
      context.clearTable()
    } catch (error) {
      console.log('error: ', error)
    }

    setIsPending(false)
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Имя
        </label>
        <div>
          <input
            ref={nameRef}
            type="text"
            name="name"
            id="phone"
            className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="ФИО"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Телефон
        </label>
        <div>
          <input
            ref={phoneRef}
            type="text"
            name="phone"
            id="phone"
            className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="+7 (999) 999-99-99"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div>
          <input
            ref={emailRef}
            type="email"
            name="email"
            id="email"
            className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={sendEmail}
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-ikbrand px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ikbrand-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ikbrand-dark"
        >
          {!isPending && <EnvelopeIcon className="h-5 w-5" />}
          {isPending && <ArrowPathIcon className="h-5 w-5 animate-spin" />}
          Отправить запрос
        </button>
        <button
          onClick={toggleUserForm}
          type="button"
          className="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
