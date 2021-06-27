import React, { memo } from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import routes from './routes'
import { HashRouter } from 'react-router-dom'

import store from './store/index'

import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style'

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>

  )
})