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
      selectionStartPercent: 0,
      selectedAminoAcidIndex: 0,
      showingInfoBox: false,
      showingAlleles: !!getParameterByName('dnaVisible'),
      marks: []
    };

    this.handleUpdateSelectionStart = this.handleUpdateSelectionStart.bind(this);
    this.handleUpdateSelectedAminoAcidIndex = this.handleUpdateSelectedAminoAcidIndex.bind(this);
    this.handleAminoAcidSliderClick = this.handleAminoAcidSliderClick.bind(this);
    this.handleMark = this.handleMark.bind(this);
  }

  handleUpdateSelectionStart(selectionStartPercent) {
    this.setState({
      selectionStartPercent
    });
  }

  handleUpdateSelectedAminoAcidIndex(selectedAminoAcidIndex) {
    this.setState({
      selectedAminoAcidIndex
    })
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
    const {selectionWidth, aminoAcids, aminoAcids2, aminoAcidWidth, width, svgImage, svgImage2, alleles, alleles2} = this.props;

    const protein1SelectionPercent =  selectionWidth / (aminoAcids.length * aminoAcidWidth);
    let protein2SelectionPercent;
    if (aminoAcids2) {
      protein2SelectionPercent = selectionWidth / (aminoAcids2.length * aminoAcidWidth);
    }

    return (
      <div className="protein-viewer">
        <div className="proteins">
          <Protein
            width={width}
            selectionStartPercent={this.state.selectionStartPercent}
            selectionPercent={protein1SelectionPercent}
            viewBox="0 0 222 206"
            svg={svgImage}
            marks={this.state.marks.map(loc => (loc + 0.5) / aminoAcids.length)}
          />
          { svgImage2 &&
            <Protein
              width={width}
              selectionStartPercent={this.state.selectionStartPercent}
              selectionPercent={protein2SelectionPercent}
              viewBox="0 0 222 206"
              highlightColor="4, 255, 0"
              svg={svgImage2}
              marks={this.state.marks.map(loc => (loc + 0.5) / aminoAcids2.length)}
            />
          }
        </div>
        <div className="amino-acids">
          <AminoAcidSlider
            aminoAcids={aminoAcids}
            alleles={alleles}
            width={width}
            aminoAcidWidth={aminoAcidWidth}
            selectionWidth={selectionWidth}
            selectionStartPercent={this.state.selectionStartPercent}
            updateSelectionStart={this.handleUpdateSelectionStart}
            updateSelectedAminoAcidIndex={this.handleUpdateSelectedAminoAcidIndex}
            onClick={this.handleAminoAcidSliderClick}
            marks={this.state.marks}
            showAlleles={this.state.showingAlleles}
            dimUnselected={this.state.showingInfoBox}
          />
          {
            aminoAcids2 &&
            <AminoAcidSlider
              aminoAcids={aminoAcids2}
              alleles={alleles2}
              width={width}
              aminoAcidWidth={aminoAcidWidth}
              selectionWidth={selectionWidth}
              selectionStartPercent={this.state.selectionStartPercent}
              updateSelectionStart={this.handleUpdateSelectionStart}
              updateSelectedAminoAcidIndex={this.handleUpdateSelectedAminoAcidIndex}
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
            aminoAcids={aminoAcids}
            secondAminoAcids={aminoAcids2}
            selection={this.state.selectedAminoAcidIndex}
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
  svgImage2: PropTypes.string,
  /** Width of the protein and slider elements, in pixels */
  width: PropTypes.number,
  /** Width of one amino acid in the slider elements, in pixels */
  aminoAcidWidth: PropTypes.number,
  /** Width of one codon in the slider elements, in pixels */
  codonWidth: PropTypes.number,
  /** Width of the selection box, in pixels. Note this, the `aminoAcidWidth` prop,
   * and the length of the amino acid chain will together combine to affect the
   * percent of protein selected. */
  selectionWidth: PropTypes.number
};

ProteinViewer.defaultProps = {
  width: 300,
  selectionWidth: 70,
  aminoAcidWidth: 17,
  codonWidth: 29
};


export default ProteinViewer;
