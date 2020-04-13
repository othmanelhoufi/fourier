import React, {Component} from 'react';
import Sketch from '../sketch/Sketch';
import './ImageUploader.scss';
import Complex from 'complex.js';
import {generate_transformed_data} from '../../utils/Algorithms';

class ImageUploader extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      pointsArray : [],
      path : null,
      fileURL : './assets/file-upload.png',
      file: null,
      errorResponse: "",
      success: false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if ( file && file.type === "image/svg+xml") {
      this.setState({
        file : file,
        fileURL: URL.createObjectURL(file)
      })

      this.read_svg_data(file);
    } else {
      this.setState({ success : false, errorResponse : "Please choose a valid SVG file"});
    }

  }

  read_svg_data = (file) => {
    let reader = new FileReader();
    const promise = new Promise(function(resolve, reject) {


      reader.onerror = () => {
      reader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      reader.onload = () => {
        let svg_text = reader.result;
        resolve(svg_text);
      };

      reader.readAsText(file);

    });

    promise.then( (svg_text) => {
      const svgXML = this.stringToXML(svg_text);
      const path = ( svgXML.querySelector('path') ) ? svgXML.querySelector('path') : null;
      const width = ( svgXML.querySelector('svg').attributes.width) ? svgXML.querySelector('svg').attributes.width.value : undefined;
      const height = ( svgXML.querySelector('svg').attributes.height) ? svgXML.querySelector('svg').attributes.height.value : undefined;
      if (path !== null && path instanceof SVGPathElement) {
        this.start_drawing( path , width , height );
        this.setState({ errorResponse : "Processing...", success : true, path : path});
      } else {
        this.setState({ file: null, fileURL : './assets/file-upload.png', success : false, errorResponse : "Problem while reading the file, please try another file"});
      }
    })
    .catch(err => this.setState({ file: null, fileURL : './assets/file-upload.png', success : false, errorResponse : "Problem while reading the file, please try another file"}));
  }

  stringToXML = (oString) => {
    return (new DOMParser()).parseFromString(oString, "text/xml");
  }

  start_drawing = (path , width , height) => {
    width = (width) ? parseFloat(width , 10) : 10;
    height = (height) ? parseFloat(height , 10) : 10;

    let scale = ( width <= 10 || height <= 10 ) ? 0.05 : ( width <= 200 || height <= 200 ) ? 2 : ( width >= 1000 || height >= 1000 ) ? 0.6 : ( width >= 800 || height >= 800 ) ? 0.8 : 1;
    let points = [];
    const length = path.getTotalLength();
    const step = length / 300;
    for (let i = length - 1; i >= 0; i -= step) {
      points.push( new Complex( path.getPointAtLength(i).x * scale - (width * scale /2), path.getPointAtLength(i).y * scale - (height * scale/2) ) );
    }

    this.setState({ pointsArray : generate_transformed_data(points) });

  }

  render() {

    return (

      <div className="image_uploader" >

        <div className="upload_sketch_container">

          <div className="input_container">
            <input type="file" id="file" accept=".svg" onChange={this.handleChange} />
            <label htmlFor="file">Upload SVG</label>
          </div>

          <div className="error-panel">
            <div className={`response ${this.state.success}`}>
              {this.state.errorResponse}
            </div>
          </div>

          <div className="image_sketch_container">

            <div className="image_container" >
              <img className={this.state.success} src={this.state.fileURL} alt="svg"></img>
            </div>

            <div className="sketch_container">
              <Sketch data={this.state.pointsArray} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default ImageUploader;
