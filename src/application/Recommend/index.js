import React, { useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { getBannerList, getRecommendList } from './store/actionCreators';
import { forceCheck } from 'react-lazyload';


import Slider from '../../components/slider/';
import RecommendList from '../../components/list/';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';

import { Content } from './style';

export default React.memo(function Recommend() {
  const { bannerList, recommendList, enterLoading } = useSelector(state => ({
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
    enterLoading: state.getIn(['recommend', 'enterLoading']),
  }), shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBannerList())
    dispatch(getRecommendList())
  }, [dispatch])

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  return (
    <Content>
      <Scroll classNmae='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      {enterLoading ? <Loading></Loading> : null}
    </Content>
  );
})


