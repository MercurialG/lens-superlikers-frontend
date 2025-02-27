import VeryfiLens from 'veryfi-lens-wasm'

export class ScannerApp {
  constructor (clientId) {
    this.statusDisplay = document.getElementById('status-display')
    this.resultDisplay = document.getElementById('result-display')
    this.clientId = clientId

    this.captureDocument = null

    this.initializeEventListeners()
  }

  async initializeScanner (flavor) {
    try {
      await VeryfiLens.init(this.clientId, {
        lensFlavor: flavor,
        torchButton: true,
        blurModal: true,
        isDocumentModal: true,
        exitButton: true,
        enableSubmit: false,
        enableLongReceiptPreview: flavor === 'long_document'
      })

      this.setupEventHandlers()

      this.updateStatus('Scanner initialized')

      await VeryfiLens.showCamera((item) => {
        if (item.image) {
          setTimeout(() => this.createSubmitButton(), 0)
          this.captureDocument = item.image
        }
      })
    } catch (error) {
      this.handleError('Initialization failed', error)
    }
  }

  setupEventHandlers () {
    VeryfiLens.onSuccess((result) => {
      this.updateStatus('Scan completed')
    })

    VeryfiLens.onFailure((error) => {
      this.handleError('Scan failed', error)
    })

    VeryfiLens.onUpdate((status) => {
      this.updateStatus(`Status: ${status.status}`)
    })
  }

  updateStatus (message) {
    this.statusDisplay.textContent = message
  }

  displayResult (result) {
    this.resultDisplay.innerHTML = `
     <h3>Scan Result:</h3>
     <pre>${JSON.stringify(result, null, 2)}</pre>
   `
  }

  handleError (context, error) {
    console.error(`${context}:`, error)
    this.statusDisplay.innerHTML = `
     <div class="error">
       ${context}: ${error.message}
     </div>
   `
  }

  initializeEventListeners () {
    document.querySelectorAll('.scan-btn').forEach(button => {
      button.addEventListener('click', () => {
        const scanType = button.dataset.type
        this.initializeScanner(scanType)
      })
    })
  }

  createSubmitButton () {
    const originalButton = document.querySelector('#veryfi-submit-button')
    const overlay = document.querySelector('#veryfi-video-overlay')

    const submitButton = originalButton.cloneNode()
    submitButton.style.display = 'block'
    submitButton.innerHTML = 'Submit'

    overlay.appendChild(submitButton)

    submitButton.addEventListener('click', async () => {
      const deviceData = await VeryfiLens.getDeviceData()
      const document = this.captureDocument

      await this.submitDocument(deviceData, document)
    })
  }

  submitDocument (deviceData, document) {
    console.log({ deviceData, document })
  }
}
