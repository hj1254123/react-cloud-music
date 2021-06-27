import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config';
import routes from './routes'
import { HashRouter } from 'react-router-dom'

import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style'

export default memo(function App() {
  return (
    <HashRouter>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      {renderRoutes(routes)}
    </HashRouter>
  )
})