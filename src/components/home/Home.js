import React from 'react';
import './Home.scss';
import ImageUploader from '../imageUploader/ImageUploader';
import Header from '../header/Header';
import Footer from '../footer/Footer';


const Home = (props) => (
  <div className="home">
    <Header />
    <ImageUploader />
    <Footer />
  </div>

);




export default Home;
