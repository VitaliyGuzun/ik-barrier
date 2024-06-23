import emailjs from '@emailjs/browser'

interface IUser {
  name: string
  phone: string
  email: string
}

interface ISendEmail {
  user: IUser
  message: string
}

export const sendEmail = async ({user, message}: ISendEmail) => {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? ''
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? ''
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? ''
  const body = {...user, message}

  try {
    await emailjs.send(serviceId, templateId, body, {
      publicKey,
    })
    console.log('SUCCESS!')
  } catch (error) {
    console.log('FAILED...', error)
  }
}
