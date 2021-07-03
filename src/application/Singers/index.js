import React, { useState, useCallback } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { categoryTypes, alphaTypes } from '../../api/config';

import { NavContainer } from "./style";

function Singers() {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  // 这里需要使用 useCallback 防止和 Horizen 无关的数据改变造成其 render。
  let handleUpdateAlpha = useCallback(
    (val) => {
      setAlpha(val);
    },
    []
  )
  let handleUpdateCatetory = useCallback(
    (val) => {
      setCategory(val);
    },
    []
  )

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类 (默认热门):"}
        handleClick={handleUpdateCatetory}
        oldVal={category}></Horizen>
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        oldVal={alpha}></Horizen>
    </NavContainer>
  )
}


export default React.memo(Singers);