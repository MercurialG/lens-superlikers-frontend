const pages = import.meta.glob('../pages/*.html', { query: '?raw', import: 'default' })
const styles = import.meta.glob('../css/*.css')

/**
 * Carga el archivo HTML correspondiente al micrositio
 */
const loadHtml = async (microsite) => {
  const app = document.querySelector('#app')
  const pagePath = `../pages/${microsite.id}.html`

  if (pages[pagePath]) {
    const page = await pages[pagePath]()
    app.innerHTML = page
  } else {
    console.error(`No se encontró la página HTML para ${microsite.id}`)
  }
}

/**
 * Carga el archivo CSS correspondiente al micrositio
 */
const loadStyles = async (microsite) => {
  const stylePath = `../css/${microsite.id}.css`

  try {
    if (styles[stylePath]) {
      await styles[stylePath]()
    } else {
      console.warn(`No se encontró el archivo de estilos para ${microsite.id}`)
    }
  } catch (error) {
    console.error(`No se pudieron cargar los estilos para ${microsite.id}`, error)
  }
}

export const loadMicrositeContent = async (microsite) => {
  await loadHtml(microsite)
  await loadStyles(microsite)
}
