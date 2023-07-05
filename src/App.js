import React, { useState , useEffect } from 'react';
import './App.css';
import MagicBox from './MagicBox';

function App() {
  const [show, setshow] = useState(false)
  const [results, setresults] = useState([])

  useEffect(()=>{
    if(results.length > 0) handleShow()
    console.log(results);
  },[results])

  const generateResults = () => {
    const form = document.getElementById('form')
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      if(input.value.length > 0) {

      } 
      else {
        // required fields are highlighted in red
        input.classList.add('require')
      }
    })
  }

  const handleShow = () => {
    setshow(!show)
  }

  const clearResults = () => {
    setresults([])
  }

  return (
    <div className="App">
      <div className='Header'>
        <h1>The Magic Box</h1>
        <h2>Do not know what to do? Touch it to find an activity</h2>
      </div>
      <div className='Content'>
        <MagicBox />
      </div>
      {
        !show && (
          <div id='form' className='Form'>
            <h1>Write Five Activities</h1>
            {
              Array.from({length: 5}).map((_,index) => {
              return <input key={index} name={`activity${index}`} type='text' />
              })
            }
            <button onClick={generateResults} className='btn-shuffle'>generate</button>
          </div>
        )
      }
      { show && (
        <div className='Preview'>
          <h1>Preview</h1>
          {
            results && results.map((result, index) => {
              return <p key={result+index}>{result}</p>
            })
          }
          <button onClick={clearResults} className='btn-clear'>clear</button>
        </div>
      )}
    </div>
  );
}

export default App;
