export const MODEL_KEY = 'MODEL'
export const NAME_KEY = 'NAME'
export const DESCRIPTION_KEY = 'DESCRIPTION'
export const SIZE_KEY = 'SIZE'
export const TOTAL_KEY = 'TOTAL'
export const ACTIONS_KEY = 'ACTIONS'
export const AMOUNT_KEY = 'AMOUNT'
export const PRISE_KEY = 'PRISE'
export const CLEAR_KEY = 'CLEAR'

// Первичные данные, без ID, потому что он формируется из названия модели
export type IModel = {
  [NAME_KEY]: string
  [DESCRIPTION_KEY]: string
  [PRISE_KEY]: Record<string, number>
}

export interface ITable {
  title: string
  models: IModel[]
  header?: {
    [NAME_KEY]: string
    [PRISE_KEY]: string
    [AMOUNT_KEY]: string
    [TOTAL_KEY]: string
    [ACTIONS_KEY]: string
  }
}

export type ITables = ITable[]

// Обработанные данные, с ID
export type IModelWithId = {
  id: string
  [NAME_KEY]: string
  [DESCRIPTION_KEY]: string
  [PRISE_KEY]: Record<string, number>
}

export interface ITableWithIds {
  title: string
  models: IModelWithId[]
  header?: {
    [NAME_KEY]: string
    [PRISE_KEY]: string
    [AMOUNT_KEY]: string
    [TOTAL_KEY]: string
    [ACTIONS_KEY]: string
  }
}

export type ITablesWithIds = ITableWithIds[]

export const TABLE_SIZE = {
  [NAME_KEY]: 45,
  [SIZE_KEY]: 15,
  [AMOUNT_KEY]: 15,
  [PRISE_KEY]: 15,
  [ACTIONS_KEY]: 13,
}
