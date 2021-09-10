import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, TextArea, Button, Select, Container, Grid, Message } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cls from './Settings.module.scss';
import { apiService } from '../services';
import { userActions } from '../actions';

const genderOptions = [
  { key: '1', text: 'Муж.', value: '1' },
  { key: '0', text: 'Жен.', value: '0' },
]

function formatDate(date) {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

const Settings = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const [profile, setProfile] = useState({...user});

  const [isSend, setIsSend] = useState(false)

  useEffect(() => {
    if (user) {
      setProfile({ ...user })
    }
  }, [user])

  const sendForm = async () => {
    setIsSend(true)
    let currentUserData = {...profile, birthday: formatDate(profile.birthday)}
    dispatch(userActions.updateUser(currentUserData))
  }
  const getCurrentSex = (sex) => {
    let currentSex = sex >= 0 ? sex.toString() : ''    
    return(currentSex)
  }
  
  return (
    <>
      {isSend &&
        <Message positive style={{ marginBottom: '25px' }}>
          <Message.Header> Изменение успешны</Message.Header>
        </Message>
      }
      {user &&
        <Grid>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field
                id='first_name'
                control={Input}
                label='Имя'
                placeholder='Имя'
                value={profile.first_name}
                onChange={e => setProfile({ ...profile, first_name: e.target.value })}
              />

              <Form.Field
                id='last_name'
                control={Input}
                label='Фамилия'
                placeholder='Фамилия'
                value={profile.last_name}
                onChange={e => setProfile({ ...profile, last_name: e.target.value })}

              />

              <Form.Field
                control={Select}
                options={genderOptions}
                value={getCurrentSex(profile.sex)}
                label={{ children: 'Пол', htmlFor: 'sex' }}
                placeholder='Пол'
                search
                searchInput={{ id: 'sex' }}
                onChange={(e, data) => setProfile({ ...profile, sex: data.value})}
              />
            </Form.Group>

            <p className={cls.dateLabel}>Дата рождение</p>
            <DatePicker id='birthday' selected={profile.birthday ? new Date(profile.birthday) : new Date()} onChange={(date) => setProfile({...profile, birthday: new Date(date)})} />
            <Form.Field
              id='form-button-control-public'
              control={Button}
              content='Сохранить'
              style={{ marginTop: '20px' }}
              onClick={sendForm}
            />
          </Form>
        </Grid>
      }
    </>
  )
}

export { Settings }