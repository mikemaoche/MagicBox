import React from 'react';
function MagicBox() {
  const playMagicBox = () => {
    console.log('test');
  }
  return (
    <div>
      <div onClick={playMagicBox}  className='Cube floatingAnimation'>?</div>
    </div>
  );
}

export default MagicBox;