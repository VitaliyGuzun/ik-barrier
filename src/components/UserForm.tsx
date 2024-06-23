import {sendEmail} from '../api'

interface IUserForm {
  toggleUserForm: () => void
}

export const UserForm = ({toggleUserForm}: IUserForm) => {
  return (
    <div className="flex items-center justify-end gap-8">
      <div className="flex items-center gap-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Имя
        </label>
        <div>
          <input
            type="text"
            name="name"
            id="phone"
            className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="ФИО"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="phone"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Телефон
        </label>
        <div>
          <input
            type="text"
            name="phone"
            id="phone"
            className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="+7 (999) 999-99-99"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div>
          <input
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
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
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