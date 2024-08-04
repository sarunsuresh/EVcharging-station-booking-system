import React from 'react'
import './Heroo.css'
import { useNavigate } from 'react-router-dom';

const Heroo = () => {
  const navigate = useNavigate();

  const handleFindChargingStation = () => {
    navigate('/booking');
  };
  return (
    <div>
      <nav className="navbar">
        {/* Navigation bar content */}
      </nav>

      <div className="hero-section">
        
        <div className="hero-content">
          <h1 className='green'>ANY PLACE  </h1>
          <h1 className='white'>ANY TIME  </h1>
          <h3 className='desc'>the way to your electrical independamce</h3>
          <button className="btn"  onClick={handleFindChargingStation}>Find Your Charging Station</button>
        </div>
      </div>
    </div>
  )
}

export default Heroo
