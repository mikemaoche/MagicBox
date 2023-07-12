import React, { useState , useEffect } from 'react';
import './App.css';
import MagicBox from './MagicBox';

function App() {
  const [show, setshow] = useState(false)
  const [results, setresults] = useState([])
  const [canPlayBox, setcanPlayBox] = useState(false)

  useEffect(() => {
    const checkFields = () => {
      if(results.length > 0) {
        // some return true if it detects one text that is empty
        const response = results.some((result) => result.text.length === 0);
        if(response) {
          setcanPlayBox(false)
        }
        else {
          setcanPlayBox(true)
          handleShow()
        }
      }
    }
    checkFields()
  },[results])

  const generateResults = () => {
    const form = document.getElementById('form')
    const textInputs = form.querySelectorAll('input[type="text"]')
    const checkboxInputs = form.querySelectorAll('input[type="checkbox"]')
    // associate results
    textInputs.forEach((textInput) => {
      const correspondingCheckbox = Array.from(checkboxInputs).find((checkbox) => checkbox.name === textInput.name);
      const isChecked = correspondingCheckbox ? correspondingCheckbox.checked : false;
      const existingValueIndex = results.findIndex((result) => result.key === textInput.name);
      if (existingValueIndex !== -1) {
        const updatedResults = [...results];
        updatedResults[existingValueIndex].text = textInput.value;
        updatedResults[existingValueIndex].checked = isChecked;
        setresults(updatedResults);
      } else {
        setresults((prevResults) => [...prevResults, { key: textInput.name, text: textInput.value, checked: isChecked }]);
      }

      // show required fields
      if(textInput.value.length > 0)  {
        textInput.classList.remove('require')
      } else {
        textInput.classList.add('require')
      }
        
    })
  }

  const handleShow = () => {
    setshow(!show)
  }
  
  return (
    <div className="App">
      <div className='Header'>
        <h1>The Magic Box</h1>
        <h2>Do not know what to do? Touch this cube to see what event will happen</h2>
      </div>
      <div className='Content'>
        <MagicBox canPlayBox={canPlayBox} setcanPlayBox={setcanPlayBox} results={results} setresults={setresults} show={show} setshow={setshow} />
      </div>
      {
        !show && (
          <div id='form' className='Form'>
            <h1>Write Five Things</h1>
            {
              Array.from({length: 5}).map((_,index) => {
                const uniqueKey = `activity${index}`;
                const inputId = `input-${uniqueKey}`;
                return (
                  <div className='field' key={uniqueKey}>
                    <label>
                      <input id={inputId} name={uniqueKey} type='text' placeholder='Typing...' />
                      <span>Is Positive?</span>
                      <input type='checkbox' name={uniqueKey} className="checkbox" />
                    </label>
                  </div>
                )
              })
            }
            <button onClick={generateResults} className='btn-shuffle'>generate</button>
          </div>
        )
      }
    </div>
  );
}

export default App;
