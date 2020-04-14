import React from 'react';
import './Footer.scss';
import Zoom from 'react-reveal/Zoom';


const Footer = (props) => (
  <div className="footer">

    <Zoom cascade>

      <div className="dedication_profils_container">
        <div className="dedication">
          This project was made in Paris by two Computer Science and Mathematics undergraduates.
        </div>

        <Zoom cascade>

          <div className="profils_container">
            <a href="https://othmanelhoufi.github.io/profil/home">
              <div className="profil">
                <img src="./assets/othman.png" alt="othmanelhoufi"></img>
                <div className="fullname">Othman El houfi</div>
              </div>
            </a>

            <div className="profil">
              <img src="./assets/whitemass.png" alt="whitemass" ></img>
              <div className="fullname">White Mass</div>
            </div>

          </div>

        </Zoom>

        <div className="copyrigth">
          &copy; 2020 Under MIT License
        </div>
      </div>


    </Zoom>
  </div>

);




export default Footer;
