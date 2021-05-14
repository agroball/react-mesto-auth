import React from 'react';
import InputForm from './InputForm';
import { Link, withRouter } from 'react-router-dom';

function  Register(props) {
    /*переменные для управления инпутами*/
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    /*функции для смены значений переменых из стейта*/
    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    /*отмена стандартного поведения + отправка введенных данных в инпуты на сервер*/
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }

    /*при монтировании контролирует название элемента link в компоненте Header*/
    React.useEffect(() => {
        if (props.isAuth) props.handleLink()
    }, [])

    return (
        <div className="passp-content">
            <form className="passp-content__form" noValidate onSubmit={handleSubmit}>
                <h2 className="passp-content__title">Регистрация</h2>
                <InputForm className="passp-content__input" placeholder="Email" type="email"></InputForm>
                <InputForm className="passp-content__input" placeholder="Пароль" type="password"></InputForm>
                <button className="passp-content__button-submit" >Зарегистрироваться</button>
            </form>
            <p className="passp-content__check">Уже зарегистрированы? <Link to="sign-in" onClick={props.handleLink} className="passp-content__link" href="#">Войти</Link></p>
        </div>
    );
}

export default withRouter(Register);