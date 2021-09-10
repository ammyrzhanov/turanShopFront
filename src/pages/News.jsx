import React from 'react'
import { Image, Card } from 'semantic-ui-react'
import cls from './Main.module.scss';

const News = ({ news }) => {
  const  options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: 'UTC'
  };
  const getCuurentFormatDate = (date) => {
    return new Date(date).toLocaleString("ru", options)
  }
  return (
    <>
      {news && news.map((item, index) => (
        <Card className={cls.aboutCard} key={index} style={{background: `linear-gradient(to right, #f5af19cb, #f84531c0), url(${item.thumbnail}) center / cover`}}>
          <Card.Content>
            {/* <Image className={cls.saledImg} src={item.thumbnail} style={{ width: '50px', borderRadius: '5px' }} /> */}
            <Card.Meta>
              <span className={cls.date}>
                {getCuurentFormatDate(item.created_at)}
              </span>
            </Card.Meta>
            <Card.Header className={cls.userName}>{item.title}</Card.Header>
            <Card.Description className={cls.cardDescription}>
              {item.description}
            </Card.Description>
          </Card.Content>
        </Card>
      ))
      }

    </>
  )
}

export { News }





