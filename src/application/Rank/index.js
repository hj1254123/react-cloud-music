import React, { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getRankList } from './store/index'
import Loading from '../../baseUI/loading';
import {
  List,
  ListItem,
  SongList,
  Container
} from './style';
import Scroll from '../../baseUI/scroll/index';
import { EnterLoading } from './../Singers/style';
import { filterIndex, filterIdx } from '../../api/utils';
import { renderRoutes } from 'react-router-config';


function Rank(props) {
  const {
    rankList: list,
    loading
  } = useSelector(state => ({
    rankList: state.getIn(['rank', 'rankList']),
    loading: state.getIn(['rank', 'loading']),
  }), shallowEqual)

  const rankList = list ? list.toJS() : []
  const dispatch = useDispatch()

  useEffect(() => {
    if(!rankList.length) {
      dispatch(getRankList())
    }
  }, [])

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = (detail) => {
    props.history.push (`/rank/${detail.id}`)
  }
  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index + 1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item) => {
            return (
              <ListItem key={item.commentThreadId} tracks={item.tracks} onClick={() => enterDetail(item)}>
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="" />
                  <div className="decorate"></div>
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                {renderSongList(item.tracks)}
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  let displayStyle = loading ? { "display": "none" } : { "display": "" };
  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>全球榜</h1>
          {renderRankList(globalList, true)}
          {loading ? <EnterLoading><Loading></Loading></EnterLoading> : null}
        </div>
      </Scroll>
      {renderRoutes(props.route.routes)}
    </Container>
  );
}
export default React.memo(Rank);
