import { useState, useEffect } from 'react';

import './App.css';

const App = () => {
    const [conversionTypes, setConversionTypes] = useState([]);
    const [fromValue, setFromValue] = useState(null);
    const [selectedType, setSelectedType] = useState (null);
    const [convertedValue, setConvertedValue] = useState('');

    useEffect(() => {
        fetch('http://localhost:60937/api/unitconversions/gettypes')
        .then(conversionsData => conversionsData.json())
        .then(types => setConversionTypes(types));
    }, []);

    const Convert = (type, value) => {
        const data = {ValueFrom: value, ConversionType: type};
        fetch('http://localhost:60937/api/unitconversions/convert',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        )
        .then(result => result.json())
        .then(value => setConvertedValue(value));
    }

    return (
        <div className='app-frame'>
            <div className='editor-label'>
                Value to convert:
            </div>
            <div className='editor-field'>
                <input 
                    type = 'number' 
                    className = 'form-input' 
                    onChange = {(event) => setFromValue(event.target.value)}
                />
            </div>

            <br/>

            <div className='editor-label'>
                Select conversion type
            </div>
            <div className='editor-field'>
                <select className = 'form-input' onChange = {(event) => setSelectedType(event.target.value)}>
                    <option></option>
                    {conversionTypes.map((type) => {
                        return (
                            <option value = {type.conversionType} key = {type.conversionType}>{type.conversionName}</option>
                        );
                    })}
                </select>
            </div>

            <br/>

            <p>
                <input 
                    type = 'button' 
                    value = 'Convert' 
                    className = 'form-input form-button'
                    onClick = {() => Convert(Number(selectedType), Number(fromValue))}
                />
            </p>

            <div className = 'editor-label'>
                Converted value:
            </div>
            <div className = 'editor-field'>
                <input 
                    type = 'number' 
                    className = 'form-input' 
                    disabled = {true}
                    value = {convertedValue}
                />
            </div>
        </div>
    );
}

export default App;
