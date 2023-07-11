import React, { useState, useEffect } from 'react';
function MagicBox({ canPlayBox, setcanPlayBox, results, setresults, show, setshow }) {
  const [showLabel, setshowLabel] = useState(false)
  const [play, setplay] = useState(false)
  const [start, setstart] = useState(false)
  var positive_emojis = ['🍒','😁','🙂','😊','🤩','💰','👑','💎','💵','🎁','🎉','🪄','🦄','🍀']
  var negative_emojis = ['🥹','😢','😭','💀','💩','🙁','😕','😓','😣','🧹','⚡','🔥','☔','🥦','🦈','🐍','🦇']
  const [result, setresult] = useState('')
  const [data, setdata] = useState([])
  const [isSpinning, setisSpinning] = useState(true)

  useEffect(() => {
    if(!canPlayBox) setstart(false)
    if(play) {
      const spans = document.querySelectorAll('.first-spin span');
      function stopSpinning() {
          spans.forEach((span) => {
            span.style.animationPlayState = 'paused';
          });
      }

      setTimeout(() => {
        stopSpinning();
        setisSpinning(false)
      }, randomNumber(2000,5000));
    }
  },[canPlayBox, data, result])

  function randomNumber(min, max) {
    const minMultiple = Math.ceil(min / 250); // Calculate the minimum multiple of 250 within the range
    const maxMultiple = Math.floor(max / 250); // Calculate the maximum multiple of 250 within the range
    const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple; // Generate a random multiple within the range
    return randomMultiple * 250; // Multiply the random multiple by 250 to get the final random number
  }

  

  const startMagicBox = () => {
    // cannot play
    if(!canPlayBox) {
      setshowLabel(true)
    }
    else {
      setshowLabel(false)
      setstart(true)
    }
  }

  const playMagicBox = () => {
    setplay(true)
    results.forEach((result) => {
      const keyExists = data.some((item) => item.key === result.key);
      let emoji = randomEmoji(result.checked)
      if (!keyExists) {
        setdata((prevData) => [
          ...prevData,
          { key: result.key, name: result.text, emoji }
        ]);
      }
    })

  }

  const randomEmoji = (value) => {
    let emoji = null
    if(value === true) {
      emoji = positive_emojis[Math.floor(Math.random() * positive_emojis.length)]
      positive_emojis = positive_emojis.filter((item) => item !== emoji)
    }
    else {
      emoji = negative_emojis[Math.floor(Math.random() * negative_emojis.length)]
      negative_emojis = negative_emojis.filter((item) => item !== emoji)
    }
    return emoji;
  }

  const clearResults = () => {
    setisSpinning(true)
    setshow(false)
    setstart(false)
    setplay(false)
    setshowLabel(false)
    setdata([])
    setresults([])
    
  }

  return (
    <div>
      {start ? (
        !play && (
          <div onClick={playMagicBox} className='Cube'><p className='arrows-animation' >press</p></div>
        )
      ) : (
        <div onClick={startMagicBox} className={`Cube floatingAnimation`}>?</div>
      )}
      {
        showLabel && (
            <p style={{ color: 'red', fontSize: 24, textAlign: 'center'}}>* You need to fill up the form.</p>
        )
      }
      {
        play && (
          <div onClick={playMagicBox} id='magicbox' className='Cube'>
            <div className='first-spin'>
              {
                data.map((element) => {
                  return <span key={element.name}>{element.emoji}</span>
                })
              }
            </div>
          </div>
        )
      }
       { 
       !isSpinning  && show && (
        <div className='Preview'>
          <h1>References Table</h1>
          {
            data && data.map((result, index) => {
              return <p key={result+index}>{result.emoji}: {result.name}</p>
            })
          }
          <button onClick={clearResults} className={`btn-clear ${data.length > 0 ? null : 'lock'} `} disabled={data.length > 0 ? false : true}>clear</button>
        </div>
      )}
    </div>
  );
}

export default MagicBox;