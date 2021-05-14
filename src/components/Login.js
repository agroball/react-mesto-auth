import React from 'react';
import InputForm from './InputForm';
import { withRouter } from 'react-router-dom';

function Login(props){
    /*переменные для управления инпутами*/
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // /*функции для смены значений переменых из стейта*/
    // function handleEmail(e) {
    //     setEmail(e.target.value);
    // }
    //
    // function handlePassword(e) {
    //     setPassword(e.target.value);
    // }
    //
    // /*отмена стандартного поведения + отправка введенных данных в инпуты на сервер*/
    // function handleSubmit(e) {
    //     e.preventDefault();
    //     props.onLogin(email, password);

    return (
        <div className="passp-content" >
            <form className="passp-content__form" noValidate>
                <h2 className="passp-content__title">Вход</h2>
                <InputForm  className="passp-content__input" placeholder="Email" type="email"></InputForm>
                <InputForm  className="passp-content__input" placeholder="Пароль" type="password"></InputForm>
                <button className="passp-content__button-submit" type="submit">Войти</button>
            </form>
        </div>
    )

}

export default withRouter(Login);