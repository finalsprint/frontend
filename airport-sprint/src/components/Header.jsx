import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {

  return (
  
    <div className='header-container'>

        <Link to='/'>
          <img src={require("./images/mapleview.png")} alt='airplane-logo' className='airport-logo'/>
        </Link>

        <hr className='separator' />

        <nav>
            <ul className='navigation'>
            <li><Link to='/reservations'>RESERVATIONS</Link></li>
            <li><Link to='/arrivals'>ARRIVALS</Link></li>
            <li><Link to='/departures'>DEPARTURES</Link></li>
            <li><Link to='/destinations'>DESTINATIONS</Link></li>
            <li><Link to='/admin'>ADMIN</Link></li>
            </ul>
        </nav>
        
    </div>
    
  )
}

export default Header