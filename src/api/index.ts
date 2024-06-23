import emailjs from '@emailjs/browser'

const from_name = 'CLIENT_NAME'
const to_name = 'Founder of the company'
const message = `
  Привет Ника
`

export const sendEmail = async () => {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID ?? ''
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID ?? ''
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY ?? ''
  const body = {
    from_name,
    to_name,
    message,
  }

  try {
    await emailjs.send(serviceId, templateId, body, {
      publicKey,
    })
    console.log('SUCCESS!')
  } catch (error) {
    console.log('FAILED...', error)
  }
}
