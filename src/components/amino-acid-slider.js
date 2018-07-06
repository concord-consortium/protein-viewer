import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './amino-acid-slider.css';

import AminoAcid from './amino-acid';

let lastMouseDownTime = -1;
const maxClickTime = 500;

class AminoAcidSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionLeft: 0,
      allelesWidth: 0,
      allelesOffset: 0,
      dragging: false,
      draggingRel: null
    };

    this.wrapperRef = React.createRef();
    this.selectionRef = React.createRef();
    this.alleleStringRef = React.createRef();

    // this.aa_a = aa_a;
    // debugger

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  }

  componentDidMount() {
    this.setState({
      allelesWidth: this.alleleStringRef.current.scrollWidth
    });
  }

  static getDerivedStateFromProps(props, state) {
    const maxLeft = props.width - props.selectionWidth;
    const selectionLeft = props.selectionStart * maxLeft;
    const maxAllelesOffset = state.allelesWidth - props.width;
    return {
      allelesOffset: Math.floor(maxAllelesOffset * props.selectionStart),
      selectionLeft
    }
  }

  // calculate relative position to the mouse and set dragging=true
  onMouseDown(evt) {
    // only left mouse button
    if (evt.button !== 0) return
    var elLoc = this.selectionRef.current.getBoundingClientRect();
    this.setState({
      dragging: true,
      draggingRel: {
        x: evt.pageX - elLoc.left
      }
    })
    evt.stopPropagation();
    evt.preventDefault();

    lastMouseDownTime = Date.now();
  }

  onMouseUp(evt) {
    this.setState({dragging: false})
    evt.stopPropagation();
    evt.preventDefault();
  }

  onMouseMove(evt) {
    if (!this.state.dragging) return
    var elLoc = this.wrapperRef.current.getBoundingClientRect();
    const left = evt.pageX - this.state.draggingRel.x - elLoc.left;

    const maxLeft = this.props.width - this.props.selectionWidth;
    const percLeft = Math.max(0, Math.min(left/maxLeft, 1));
    this.props.updateSelectionStart(percLeft);
    evt.stopPropagation();
    evt.preventDefault();
  }

  onClick() {
    if (Date.now() - lastMouseDownTime > maxClickTime) return;

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    let wrapperClass = "amino-acid-slider";
    //FIXME
    if (this.state.selectionLeft > 10) {
      wrapperClass += " fade-left";
    }
    const maxLeft = this.props.width - this.props.selectionWidth;
    if (this.state.selectionLeft < maxLeft - 10) {
      wrapperClass += " fade-right";
    }

    const frameStyle = {
      width: `${this.props.width}px`
    };

    const selectStyle = {
      width: `${this.props.selectionWidth}px`,
      left: `${this.state.selectionLeft}px`
    }
    if (this.props.highlightColor) {
      selectStyle.border = `1px solid rgb(${this.props.highlightColor})`;
      selectStyle.backgroundColor = `rgba(${this.props.highlightColor}, 0.3)`;
    }

    const allelesStyle = {
      left: `-${this.state.allelesOffset}px`,
      width: `${this.state.allelesWidth}px`
    }

    const acidWidth = 17;

    const location = Math.floor((this.props.aminoAcids.length - 1) * this.props.selectionStart);
    const AminoAcids = this.props.aminoAcids.split('').map((a, i) =>
      <AminoAcid type={a} x={acidWidth/2 + (i * (acidWidth * 1.1))} y={3} width={acidWidth} selected={location === i} key={i} />
    )

    const marks = this.props.marks.map(loc =>
      <rect x={acidWidth/2 + (loc * (acidWidth * 1.1)) - 1} y="1" width="19" height="20" style={{fill: "#33F", stroke: "#AAF", strokeWidth: 2}} />
    )

    console.log("====")
    console.log(this.props.marks)
    console.log(marks)

    return (
      <div className={wrapperClass} style={frameStyle} ref={this.wrapperRef}>
        <div className="amino-acids" style={allelesStyle} ref={this.alleleStringRef}>
          <svg width={1000} height={22} viewBox="0 0 1000 22">
            <path d="M9,12L981,12" style={{stroke: '#AAA', strokeWidth: '2px'}} />
            { marks }
            { AminoAcids }
          </svg>
        </div>
        <div
          className="selection"
          style={selectStyle}
          ref={this.selectionRef}
          onMouseDown={this.onMouseDown}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

AminoAcidSlider.propTypes = {
  aminoAcids: PropTypes.string,
  width: PropTypes.number,
  selectionStart: PropTypes.number,
  selectionWidth: PropTypes.number,
  highlightColor: PropTypes.string,
  updateSelectionStart: PropTypes.func,
  marks: PropTypes.array
};

AminoAcidSlider.defaultProps = {
  aminoAcids: "",
  width: 600,
  selectionWidth: 90,
  selectionStart: 0,
  marks: []
};

export default AminoAcidSlider;
