import React, { memo } from 'react'

import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style'

export default memo(function App() {
  return (
    <div>
      <GlobalStyle></GlobalStyle>
      <IconStyle></IconStyle>
      <i className="iconfont">&#xe62b;</i>
    </div>
  )
})