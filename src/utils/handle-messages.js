export const printError = (context, error) => {
  const statusDisplay = document.getElementById('status-display')

  statusDisplay.innerHTML = `
   <div class="error">
     ${context}: ${error}
   </div>
 `
}

export const printSuccess = (message) => {
  const resultDisplay = document.getElementById('result-display')
  resultDisplay.innerHTML = `<div class="success">${message}</div>`
}
