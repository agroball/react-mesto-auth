import React from 'react';

function InputForm(props) {
    const [error, setError] = React.useState('');

    /*контроль пробелов в инпуте + считывание его значения*/
    function handleChange(e) {
        props.onChange(e);
        /*если значение инпута после применения трима содержит менее 2х символов + отсутствует сообщение об ошибке => вывести ошибку*/
        if (e.target.value.trim().length < 2 && e.target.validationMessage === '') {
            setError('Слово должно содержать как минимум 2 символа помимо пробелов.');
        } else {
            setError(e.target.validationMessage);
        }
    }

    /*очистка спанов от ошибок*/
    React.useEffect(() => {
        if (!props.isOpen) { setError('') }
    }, [props.isOpen])

    return (
        <div className="popup__input_wrapper">
            <input ref={props.ref} value={props.value} onChange={handleChange} className={props.className} id={props.id} type={props.type} minLength={props.minLength} maxLength={props.maxLength} placeholder={props.placeholder} name={props.name} required/>
            <span className="popup__error">{error}</span>
        </div>
    );
}

export default InputForm;