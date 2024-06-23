import {useLocation} from 'react-router-dom'
import queryString from 'query-string'

interface IParams {
  isSendToEmail: boolean
}

export const useParams = (): IParams => {
  const location = useLocation()
  const {indev} = queryString.parse(location.search)
  const features = typeof indev == 'string' ? indev.split(',') : []

  const isSendToEmail = features.includes('send-to-email')

  return {isSendToEmail}
}
