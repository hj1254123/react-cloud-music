import React, { useState, useCallback, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import  LazyLoad, {forceCheck} from 'react-lazyload';


import { categoryTypes, alphaTypes } from '../../api/config';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';

import Horizen from '../../baseUI/horizen-item';
import Scroll from './../../baseUI/scroll/index';
import Loading from '../../baseUI/loading';

import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from "./style";

function Singers() {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = useSelector(state => ({
    singerList: state.getIn(['singers', 'singerList']),
    enterLoading: state.getIn(['singers', 'enterLoading']),
    pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
    pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
    pageCount: state.getIn(['singers', 'pageCount'])
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotSingerList())
  }, [])

  const updateDispatch = (category, alpha) => {
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerList(category, alpha));
  }
  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (category, alpha, hot, count) =>  {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(count + 1));
    if(hot) {
      dispatch(refreshMoreHotSingerList());
    } else {
      dispatch(refreshMoreSingerList(category, alpha));
    }
  }
  //顶部下拉刷新
  const pullDownRefreshDispatch = (category, alpha) =>  {
    dispatch(changePullDownLoading(true));
    dispatch(changePageCount(0));
    if(category === '' && alpha === '') {
      dispatch(getHotSingerList());
    } else {
      dispatch(getSingerList(category, alpha));
    }
  }
  // 这里需要使用 useCallback 防止和 Horizen 无关的数据改变造成其 render。
  let handleUpdateAlpha = useCallback(
    (val) => {
      setAlpha(val);
      updateDispatch(category, val);
    },
    [category]
  )

  let handleUpdateCatetory = useCallback(
    (val) => {
      setCategory(val);
      updateDispatch(val, alpha);
    },
    [alpha]
  )

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    const list = singerList ? singerList.toJS(): [];

    return (
      <List>
        {
          list.map((item, index) => {
            return (
              <ListItem key={item.accountId+""+index}>
                <div className="img_wrapper">
                  <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png').default} alt="music"/>}>
                    <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                </div>
                <span className="name">{item.name}</span>
              </ListItem>
            )
          })
        }
      </List>
    )
  };
  return (
    <div>
      <NavContainer>
        <Horizen list={categoryTypes} title={"分类:"} handleClick={(val) => handleUpdateCatetory(val)} oldVal={category}></Horizen>
        <Horizen list={alphaTypes} title={"首字母:"} handleClick={val => handleUpdateAlpha(val)} oldVal={alpha}></Horizen>
      </NavContainer> 
      <ListContainer>
        <Scroll
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
          onScroll={forceCheck}
        >
          { renderSingerList() }
        </Scroll>
        {enterLoading ? <Loading></Loading> : null}
      </ListContainer>
    </div>
  )
}


export default React.memo(Singers);