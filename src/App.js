import React, { memo } from 'react'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config';
import routes from './routes'
import { HashRouter } from 'react-router-dom'

import store from './store/index'

import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style'
import { Data } from './application/Singers/data';

export default memo(function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>
          {renderRoutes(routes)}
        </Data>
      </HashRouter>
    </Provider>

  )
})