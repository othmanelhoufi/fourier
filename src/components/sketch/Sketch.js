import React, {Component} from 'react';
import p5 from 'p5';
import './Sketch.scss';


class Sketch extends Component {
  constructor( props ) {
    super( props );
    this.myRef = React.createRef();
    this.state ={
      data : []
    }
  }

  static getDerivedStateFromProps(props, state) {
    return {data: props.data};
  }

  sketch = (p) => {
    let fourierX = this.state.data;
    let time = 0;
    let path = [];
    let scale = 1;
    p.get_appropriate_size = () =>{
      if (p.windowWidth > 1200 ) {
        return 500;
      }
      if (p.windowWidth <= 1200 ) {
        return 350;
      }
    }

    p.setup = () => {
      const size = p.get_appropriate_size();
      scale = (size === 350) ? 1.5 : 1;
      p.createCanvas(size, size);

    }

    p.epicycles = (x, y, rotation, scale, fourier) => {
      for (let i = 0; i < fourier.length; i++) {
        let prevx = x;
        let prevy = y;
        let freq = fourier[i].freq;
        let radius = fourier[i].amp;
        let angle = fourier[i].angle;
        x += (radius * Math.cos(freq * time + angle + rotation)) / scale;
        y += (radius * Math.sin(freq * time + angle + rotation)) / scale;

        p.stroke(255, 100);
        p.noFill();
        p.ellipse(prevx, prevy, (radius * 2) / scale);
        p.stroke(255);
        p.line(prevx, prevy, x, y);
      }
      return p.createVector(x, y);
    }

    p.draw = () => {
      p.background(0);

      if (fourierX.length > 1) {
        let v = p.epicycles(p.width / 2, p.height / 2, 0, scale, fourierX);
        path.push(v);

        p.beginShape();
        p.noFill();
        for (let i = path.length - 1; i >= 0; i--) {
          p.vertex(path[i].x, path[i].y);
        }
        p.endShape();

        const dt = p.TWO_PI / fourierX.length;
        time += dt;

        if (time > p.TWO_PI) {
          // p.noLoop();
          time = 0;
          path = [];
        }
      }

    }

    p.windowResized = () => {
      const size = p.get_appropriate_size();
      scale = (size === 350) ? 1.5 : 1;
      p.resizeCanvas(size, size);

    }

  }

  componentDidMount() {
    this.myP5 = new p5(this.sketch, this.myRef.current);
  }

  componentDidUpdate() {
    while (this.myRef.current.firstChild) {
      this.myRef.current.removeChild(this.myRef.current.lastChild);
    }
    this.myP5 = new p5(this.sketch, this.myRef.current);

  }

  render() {

    return (

      <div ref={this.myRef}>

      </div>
    );
  }
}

export default Sketch;
