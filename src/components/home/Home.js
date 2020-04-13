import React from 'react';
import './Home.scss';
import ImageUploader from '../imageUploader/ImageUploader';
import Header from '../header/Header';


const Home = (props) => (
  <div className="home">
    <Header />
    <ImageUploader />
  </div>

);




export default Home;
