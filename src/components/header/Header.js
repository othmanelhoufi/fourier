import React from 'react';
import './Header.scss';


const Header = (props) => (
  <div className="header">
    <div className="image_description_container">

      <div className="fourier_image">
        <img src="./assets/fourier.jpeg" alt="fourier"></img>
      </div>

      <div className="description">
        <div className="title"> Visualize Fourier Transform </div>
        <div className="details">
          <p>
            Jean-Baptiste Joseph Fourier was a French mathematician and physicist born in Auxerre and best known for initiating the investigation of Fourier series, which eventually developed into Fourier analysis and harmonic analysis, and their applications to problems of heat transfer and vibrations.
          </p>

          <p>
            The Fourier transform (FT) decomposes a function (often a function of time, or a signal) into its constituent frequencies.
            The Fourier transform of a function of time is itself a complex-valued function of frequency, whose magnitude (modulus) represents the amount of that frequency present in the original function, and whose argument is the phase offset of the basic sinusoid in that frequency.
          </p>

          <p>
            This web application is a small application of the Fourier Transform, after extracting the (x,y) coordinates from the SVG path passed in as a file, it then uses a known algorithm called the Fast Fourier Transform (FFT), also known as the Cooley-Tukey algorithm, in order to generate the appropriate frequencies, then it's been drawn gradually using epicycles.
          </p>
        </div>
      </div>
    </div>
  </div>

);




export default Header;
