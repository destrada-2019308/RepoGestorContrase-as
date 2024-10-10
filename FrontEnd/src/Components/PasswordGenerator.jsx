import { useState } from 'react'
import Checkbox from './CheckBox'
import DiscreteSlider from './DiscreteSlider'

export const PasswordGenerator = () => {

    const [ useLowerCase, setUseLowerCase ] = useState(true)
    const [ useUpperCase, setUseUpperCase ] = useState(false)
    const [ passwordLength, setPasswordLength ] = useState(5)


    const handleCheckboxChange = (setState) => (event) => {
        setState(event.target.checked);
    };

    // Función para manejar cambios en el slider
    const handleSliderChange = (event, newValue) => {
 
        setPasswordLength(newValue);
    };

    const create_password = () => {
        const chars = 'abcdefghijklmnñopqrstuvwxyz';
        const charsMay = 'ABCDEFGHIJKLMNÑOPQRSTUV';
        const digits = '0123456789';

        const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            if (useLowerCase) password += getRandomChar(chars);
            if (useUpperCase) password += getRandomChar(charsMay);
            if (i % 2 === 0) password += getRandomChar(digits);
        }

        return password.slice(0, passwordLength);  
    };
 
    let password = create_password()
 

  return (
    <div className='m-2'>
        <div className='form-control p-4'>
            <h4>Generador de contraseñas</h4>
            <hr />
            <div className="m-4 p-4 row justify-content-center align-items-center">
                <div className="col-auto">
                    <label htmlFor="" className='form-label'>Longitud de contraseña</label>
                     
                    <DiscreteSlider value={passwordLength} onChange={handleSliderChange} />
                </div>
                <div className="col-auto ">
                    <Checkbox text={'Minúsculas'} checked={useLowerCase} onChange={handleCheckboxChange(setUseLowerCase)} />
                </div>
                <div className="col-auto">
                <Checkbox text={'Mayúsculas'} checked={useUpperCase} onChange={handleCheckboxChange(setUseUpperCase)} />
                </div>
                <span className='m-4 text-danger'>Tu contraseña es: <h1>{password}</h1></span>
            </div>
            
        </div>
    </div>
  )
}
