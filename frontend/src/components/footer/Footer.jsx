import React from 'react';
import './footer.scss';
import Logo from '../../Images/logo1.jpg';
import { TiSocialFacebook } from 'react-icons/ti';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiFillYoutube } from 'react-icons/ai';
import { FaPinterestP } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="sectionContainer container grid">
        <div className="gridOne">
          <div className="logoDiv">
            <img src={Logo} className='Logo' alt="Logo" />
          </div>
          <p>Your mind should be stronger than your feelings, Skardu Travelics Booking!</p>
          <div className="socialIcon flex">
            <a href="https://www.facebook.com/Rinor.pakistan">
              <TiSocialFacebook className='icon' />
            </a>
            <a href="https://www.linkedin.com/company/rinor-pk/mycompany/">
              <AiOutlineLinkedin className='icon' />
            </a>
            <a href="https://www.youtube.com/your-youtube-profile-link">
              <AiFillYoutube className='icon' />
            </a>
            <a href="https://www.pinterest.com/your-pinterest-profile-link">
              <FaPinterestP className='icon' />
            </a>
          </div>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">About our Travelics</span>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Hotel Status</a></li>
            <li><a href="#">Travel</a></li>
            <li><a href="#">Check-In</a></li>
            <li><a href="#">Check-Out</a></li>
            <li><a href="#">Manage your booking</a></li>
          </ul>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Quick Guide</span>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">How to</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Baggage</a></li>
            <li><a href="#">Route Map</a></li>
            <li><a href="#">Our Communities</a></li>
          </ul>
        </div>
        <div className="footerLinks">
          <span className="linkTitle">Information</span>
          <ul>
            <li><a href="#">Chauffeur</a></li>
            <li><a href="#">Our partner</a></li>
            <li><a href="#">Destination</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Transportation</a></li>
            <li><a href="#">Programme Rules</a></li>
          </ul>
        </div>
      </div>
      <div className="copyRightDiv flex">
        <p>Courtesy Design|Developed by <a href="#" target='-blank'>Mehmooda Kiran</a></p>
      </div>
    </div>
  );
};

export default Footer;
