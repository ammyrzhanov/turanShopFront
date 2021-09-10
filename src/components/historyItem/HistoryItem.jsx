import React, { useState, useEffect } from 'react'
import { List, Icon, Message } from 'semantic-ui-react'
import cls from './History.module.scss'

const HistoryItem = ({ historyes }) => {
    const options = {
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
            {!historyes &&
                <Message positive style={{ marginBottom: '25px', margintop: '25px' }}>
                    <Message.Header> У вас пока нету начислений</Message.Header>
                </Message>
            }
            {historyes && historyes.map((history, index) => (
                <List.Item className={cls.listItem} key={index}>

                    <List.Content>
                        <div className={cls.date}>{getCuurentFormatDate(history.date)}</div>
                    </List.Content>

                    <List.Content floated='right'>
                        <div className={cls.prise}>
                            {/* Начислено бонусов  <Header sub>{history.bonus}</Header> */}
                            <div className={cls.bonus}>
                                {history.method === 0 ? 'Начисление' : 'Списание'} бонус <span className={history.method === 0 ? cls.countAdd : cls.removeAdd}>{history.bonus}</span>руб
                            </div>
                        </div>
                    </List.Content>

                    <Icon className={history.method === 0 ? cls.iconPersent : cls.iconPersentRemove} name='percent' />

                    <List.Content>
                        <div className={cls.action}>{history.magazin}</div>
                    </List.Content>
                </List.Item>
            ))}
        </>
    )
}

export { HistoryItem }