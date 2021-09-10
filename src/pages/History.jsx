import React, { useState, useEffect } from 'react'
import { List, Header, Image, Container, Icon } from 'semantic-ui-react'
import { useDispatch, useSelector} from 'react-redux'
import { historyActions } from '../actions'
// import cls from './History.module.scss'
import { HistoryItem } from '../components/historyItem/HistoryItem'
const History = () => {
  const dispatch = useDispatch();
  // const [historyes, setHistoryes] = useState(useSelector(state => state.history.data));
  const historyes = useSelector(state => state.history.data);
  useEffect(() => {
    dispatch(historyActions.getHistory())
  }, [])

  return (
    <>
      <List>
        <HistoryItem
          historyes={historyes}
        />
      </List>
    </>
  )
}

export { History }