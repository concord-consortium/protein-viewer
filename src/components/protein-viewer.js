import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AminoAcidSlider from './amino-acid-slider'
import Protein from './protein'
import InfoBox from './info-box';
import getParameterByName from '../util/urlUtils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './protein-viewer.css';

class ProteinViewer extends Component {

  constructor() {
    super();

    this.state = {
      selectionStart: 0,
      showingInfoBox: false,
      showingAlleles: !!getParameterByName('dnaVisible'),
      marks: []
    };

    this.handleUpdateSelectionStart = this.handleUpdateSelectionStart.bind(this);
    this.handleAminoAcidSliderClick = this.handleAminoAcidSliderClick.bind(this);
    this.handleMark = this.handleMark.bind(this);
  }

  handleUpdateSelectionStart(selectionStart) {
    this.setState({
      selectionStart: selectionStart
    });
  }

  handleAminoAcidSliderClick() {
    this.setState({
      showingInfoBox: !this.state.showingInfoBox
    });
  }

  handleMark(location) {
    const existingMarks = this.state.marks;
    if (existingMarks.indexOf(location) > -1) {
      existingMarks.splice(existingMarks.indexOf(location), 1);
    } else {
      existingMarks.push(location);
    }
    this.setState({
      marks: existingMarks
    });
  }

  handleAllelesToggle = () => {
    this.setState({
      showingAlleles: !this.state.showingAlleles
    });
  }

  render() {
    return (
      <div className="protein-viewer">
        <div className="proteins">
          <Protein
            width={300}
            selectionStart={this.state.selectionStart}
            viewBox="0 0 222 206"
            svg={this.props.svgImage}
            marks={this.state.marks.map(loc => loc / this.props.aminoAcids.length)}
          />
          { this.props.svgImage2 &&
            <Protein
              width={300}
              selectionStart={this.state.selectionStart}
              viewBox="0 0 222 206"
              highlightColor="4, 255, 0"
              svg={this.props.svgImage2}
              marks={this.state.marks.map(loc => loc / this.props.aminoAcids.length)}
            />
          }
        </div>
        <div className="amino-acids">
          <AminoAcidSlider
            aminoAcids={this.props.aminoAcids}
            alleles={this.props.alleles}
            width={300}
            selectionStart={this.state.selectionStart}
            updateSelectionStart={this.handleUpdateSelectionStart}
            onClick={this.handleAminoAcidSliderClick}
            marks={this.state.marks}
            showAlleles={this.state.showingAlleles}
            dimUnselected={this.state.showingInfoBox}
          />
          { 
            this.props.aminoAcids2 &&
            <AminoAcidSlider
              aminoAcids={this.props.aminoAcids2}
              alleles={this.props.alleles2}
              width={300}
              selectionStart={this.state.selectionStart}
              updateSelectionStart={this.handleUpdateSelectionStart}
              onClick={this.handleAminoAcidSliderClick}
              marks={this.state.marks}
              dimUnselected={this.state.showingInfoBox}
              showAlleles={this.state.showingAlleles}
              highlightColor="4, 255, 0"
            />
          }
        </div>
        {this.state.showingInfoBox &&
          <InfoBox
            aminoAcids={this.props.aminoAcids}
            secondAminoAcids={this.props.aminoAcids2}
            selection={this.state.selectionStart}
            marks={this.state.marks}
            onMarkLocation={this.handleMark}
            width={274}
          />
        }
        {
          getParameterByName('dnaSwitchable') &&
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.showingAlleles}
                onChange={this.handleAllelesToggle}
              />
            }
            label="Show DNA"
          />
        }
      </div>
    );
  }
}

ProteinViewer.propTypes = {
  aminoAcids: PropTypes.string,
  alleles: PropTypes.string,
  svgImage: PropTypes.string,
  aminoAcids2: PropTypes.string,
  alleles2: PropTypes.string,
  svgImage2: PropTypes.string
};

export default ProteinViewer;
