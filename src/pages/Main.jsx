import React, { useState, useEffect } from 'react'
import Input from 'react-phone-number-input/input'
import { Button, Form, Grid, Header, Image, Segment, Card, Icon, Message, Container } from 'semantic-ui-react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { userActions } from '../actions';
import { newsActions } from '../actions';

import { apiService } from '../services';
import { Navbar } from '../components/Navbar';
import cls from './Main.module.scss';
import BarcodeImg from '../img/Barcode2.png';
import ReactCodeInput from "react-code-input";
import { News }  from './News'
import { inputStyle } from '../constants/index'

const Main = () => {
  const token = localStorage.getItem('user');
  let user = useSelector(state => state.user);
  let news = useSelector(state => state.news.data);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const Login = () => {
    const [isPinCodeValid, setIsPinCodeValid] = useState(true);
    const [phone, setPhone] = useState('XXXX')
    const [shortphone, setShortphone] = useState('')
    const [barcode, setBarcode] = useState('XXXXXX')
    const [barcodeHide, setBarcodeHide] = useState(false);
    const [errorBarcode, setErrorBarcode] = useState(false)
    useEffect(() => {
      console.log('shortphone', shortphone);
    }, [shortphone])

    const shortcode = 2990000

    function handleSubmit(e) {
      e.preventDefault();
      if (phone && barcode) {
        // get return url from location state or default to home page
        const { from } = location.state || { from: { pathname: "/" } };
        dispatch(userActions.login(shortphone + phone, shortcode + barcode, from));
        // dispatch(newsActions.getNews())
      }
    }

    const handleBarcode = () => {
      apiService.getPhone(shortcode + barcode)
        .then(
          phone => {
            setShortphone(phone.slice(0, -4))
            console.log(phone)
            setBarcodeHide(true)
            setErrorBarcode(false)
          },
          error => {
            console.log(error)
            setIsPinCodeValid(false)
            setErrorBarcode(true)
            setBarcode('')
            Array.from(document.querySelectorAll("input")).forEach(input => {
              input.value = ''
            });
          }
        );
    };

    const handlePinChange = barcode => {
      setBarcode(barcode);
    };

    const handlePhone = phone => {
      setPhone(phone);
    };

    const clickOnInput = () => {
      if (!isPinCodeValid) {
        setIsPinCodeValid(true)
      }
    }

    return (
      <Grid textAlign='center' style={{ height: '100vh', marginTop: '15px' }} verticalAlign='top'>
        {!barcodeHide && <Grid.Column style={{ maxWidth: 450 }}>
          {errorBarcode &&
            <Message warning style={{ marginTop: '-20px' }}>
              <Message.Header> Карта не найдена</Message.Header>
            </Message>
          }

          <Form className={cls.form} size='large'>
            <Segment stacked className={cls.segment}>
              <div className={cls.cardTitle}>
                <h1>ТУРАН</h1>
                <h4>БОНУСНАЯ КАРТА</h4>
              </div>
              <div className={cls.barcodeContainer}>
                <Image className={cls.barcodeImgNew} src={BarcodeImg} />
                <p className={cls.barcodeNew}>{shortcode} {barcode}</p>
              </div>
            </Segment >
            <div onClick={clickOnInput} id="formPinCode">
              <ReactCodeInput
                inputStyle={inputStyle}
                id="pinCode"
                type="number"
                isValid={isPinCodeValid}
                fields={6}
                onChange={handlePinChange}
                value={errorBarcode ? '' : barcode}
              />
            </div>
            <Header as='h4' color='teal' textAlign='center' style={{ marginTop: '12px' }}>
              Введите последние 6 цифры номера карты
              </Header>
            <Button color='teal' size='large' disabled={barcode.length <= 4} onClick={handleBarcode}>
              Подтвердить
            </Button>
          </Form>
        </Grid.Column>}
        {barcodeHide && <Grid.Column style={{ maxWidth: '450px', height: '45vh' }}>

          <Form className={cls.form} size='large'>
            <Segment stacked className={cls.segment}>
              <div className={cls.cardTitle}>
                <h1>ТУРАН</h1>
                <h4>БОНУСНАЯ КАРТА</h4>
              </div>
              <div className={cls.rowContainer}>
                <div className={cls.pin} >{shortphone}{phone}</div>
              </div>
            </Segment>
            <ReactCodeInput inputStyle={inputStyle} value={phone} onChange={handlePhone} type='number' fields={4} />
            <Header as='h4' color='teal' textAlign='center' style={{ marginTop: '12px' }}>
              Введите последние 4 цифры номера телефона
          </Header>
            <Button color='teal' size='large' disabled='' name='' onClick={handleSubmit}>
              Подтвердить
            </Button>
            <Button color='teal' size='large' disabled='' name='' > Отмена </Button>
          </Form>
        </Grid.Column>}
      </Grid>
    )
  }
  return (
    <>
      {!token && <Login />}
      {token && <div >
        <div className={cls.cardsContainer}>
          {user.data && <Card className={cls.card}>
            <Card.Content>
              <Card.Meta className={cls.cardTitle}>
                <span className='date'>Ваш бонус</span>
              </Card.Meta>
              <Card.Header className={cls.subTitle}>{user.data.bonus} руб</Card.Header>
              <Card.Description className={cls.btnBlock}>
                <Button className={cls.button} color='white' style={{ width: '100%' }}>
                  <Link to='/history'> ИСТОРИЯ <Icon name='history' /></Link>
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>}
          <News
           news={news}
          />

        </div>

      </div>}
    </>
  )
}

export { Main }