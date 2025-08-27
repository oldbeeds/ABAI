import { App } from './app.js'
import { config } from './config.js'

const app = new App({
  mount: document.getElementById('app'),
  config
})
app.start()
