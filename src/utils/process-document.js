import axios from 'axios'
import { printError, printSuccess } from './handle-messages'

const { VITE_URL } = import.meta.env

export const processDocument = async (deviceData, document) => {
  const params = new URLSearchParams(window.location.search)
  const campaign = params.get('campaign')
  const uid = params.get('uid')

  if (!campaign || !uid) return

  try {
    const response = await axios.post(`${VITE_URL}/api/process_document`, { deviceData, document, uid, campaign })
    if (response.ok) {
      printSuccess(response.message)
    }
  } catch (err) {
    printError('Error de la factura', err.response.data.message || err.message)
  }
}
