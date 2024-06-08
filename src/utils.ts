import {ITables, ITablesWithIds, NAME_KEY} from './types'

export const mapIds = (data: ITables): ITablesWithIds => {
  const result = data.map((table) => ({
    ...table,
    models: table.models.map((model) => ({
      ...model,
      id: model[NAME_KEY].replaceAll('/', '-').replaceAll(/\s+|\./g, ''),
    })),
  }))

  return result
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
