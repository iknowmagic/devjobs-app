import { App } from 'vue'

import sLoading from '@/components/sLoading'
import sButton from '@/components/sButton'
import sCheckbox from '@/components/sCheckbox'

const globalComponents = (app: App) => {
  app.component('SLoading', sLoading)
  app.component('SCheckbox', sCheckbox)
  app.component('SButton', sButton)
}

export default globalComponents
