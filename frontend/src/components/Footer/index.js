// frontend/src/components/Navigation/index.js
import React from 'react';
import linkedin from '../../img/linkedin.png'
import github from '../../img/github.png'
import './Footer.css';

function Footer() {

  return (
    <div className='About-link-port-div'>
    <div className='About-link-port'>Link to Developer'
      <a href=" https://www.linkedin.com/in/dongfang-song-25261218a/"><img id='linkedin' src={linkedin} /></a>
      <a href=" https://github.com/NYDF"><img id='github' src={github} /></a>
    </div>
  </div>
  );
}

export default Footer;
