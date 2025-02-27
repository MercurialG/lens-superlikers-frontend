import './css/styles.css'
import { MICROSITES } from './utils/config'
import { loadMicrositeContent } from './utils/dom-loader'
import { ScannerApp } from './utils/scanner'

const init = async () => {
  const params = new URLSearchParams(window.location.search)
  const campaign = params.get('campaign')

  if (!campaign) return

  const microsite = MICROSITES[campaign]
  await loadMicrositeContent(microsite)

  const scannerApp = new ScannerApp(microsite.clientId)

  if (microsite.autoStart && microsite.defaultType) {
    scannerApp.initializeScanner(microsite.defaultType)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})
