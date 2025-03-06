export const createSpinner = (container, message) => {
  const spinnerOverlay = document.createElement('div')
  spinnerOverlay.style.position = 'fixed'
  spinnerOverlay.style.top = '0'
  spinnerOverlay.style.left = '0'
  spinnerOverlay.style.width = '100%'
  spinnerOverlay.style.height = '100%'
  spinnerOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
  spinnerOverlay.style.display = 'flex'
  spinnerOverlay.style.flexDirection = 'column'
  spinnerOverlay.style.justifyContent = 'center'
  spinnerOverlay.style.alignItems = 'center'
  spinnerOverlay.style.zIndex = '9999'

  const spinner = document.createElement('div')
  spinner.style.border = '4px solid #f3f3f3'
  spinner.style.borderTop = '4px solid #4CAF50'
  spinner.style.borderRadius = '50%'
  spinner.style.width = '40px'
  spinner.style.height = '40px'
  spinner.style.animation = 'spin 1s linear infinite'

  const style = document.createElement('style')
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)

  const messageElement = document.createElement('div')
  messageElement.style.color = '#4CAF50'
  messageElement.style.marginTop = '20px'
  messageElement.style.fontSize = '16px'
  messageElement.textContent = message

  spinnerOverlay.appendChild(spinner)
  spinnerOverlay.appendChild(messageElement)
  container.appendChild(spinnerOverlay)

  return {
    show: () => {
      spinnerOverlay.style.display = 'flex'
    },
    hide: () => {
      spinnerOverlay.style.display = 'none'
    },
    remove: () => {
      container.removeChild(spinnerOverlay)
    },
    updateMessage: (newMessage) => {
      messageElement.textContent = newMessage
    }
  }
}
