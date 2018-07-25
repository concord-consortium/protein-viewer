import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AminoAcidSlider from './amino-acid-slider'
import Protein from './protein'
import InfoBox from './info-box';
import getParameterByName from '../util/urlUtils';
import { extractCodons } from '../util/dna-utils';
import { getAminoAcidFromCodon, getAminoAcidsFromCodons } from '../util/amino-acid-utils';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './protein-viewer.css';

class ProteinViewer extends Component {

  constructor() {
    super();

    this.state = {
      selectionStartPercent: 0,
      selectedAminoAcidIndex: 0,
      selectedAminoAcidXLocation: 0,
      showingInfoBox: false,
      showingDNA: !!getParameterByName('dnaVisible'),
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

  handleUpdateSelectedAminoAcidIndex(selectedAminoAcidIndex, selectedAminoAcidXLocation, showInfo) {
      this.setState({
        selectedAminoAcidIndex,
        selectedAminoAcidXLocation
      });

    if (showInfo) {
      if (!this.state.showingInfoBox || selectedAminoAcidIndex !== this.state.selectedAminoAcidIndex) {
        this.setState({
          showingInfoBox: true
        });
      } else {
        this.setState({showingInfoBox: false});
      }
    }

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

  handleDNAToggle = () => {
    this.setState({
      showingDNA: !this.state.showingDNA
    });
  }

  render() {
    const {selectionWidth, dna, dna2, aminoAcidWidth, width, svgImage, svgImage2} = this.props;

    const codons = extractCodons(dna);
    const aminoAcids = getAminoAcidsFromCodons(codons);

    window.codons = codons;
    window.aminoAcids = aminoAcids;

    window.getAminoAcidsFromCodons = getAminoAcidsFromCodons;
    window.getAminoAcidFromCodon = getAminoAcidFromCodon;


    const protein1SelectionPercent =  selectionWidth / (aminoAcids.length * aminoAcidWidth);
    let codons2;
    let aminoAcids2;
    let protein2SelectionPercent;
    if (dna2) {
      codons2 = extractCodons(dna2);
      aminoAcids2 = getAminoAcidsFromCodons(codons2);
      protein2SelectionPercent = selectionWidth / (aminoAcids2.length * aminoAcidWidth);
    }

    return (
      <div className="protein-viewer">
        <div className="proteins">
          <Protein
            width={260}
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
            codons={codons}
            width={width}
            aminoAcidWidth={aminoAcidWidth}
            selectionWidth={selectionWidth}
            selectionStartPercent={this.state.selectionStartPercent}
            updateSelectionStart={this.handleUpdateSelectionStart}
            selectedAminoAcidIndex={this.state.selectedAminoAcidIndex}
            updateSelectedAminoAcidIndex={this.handleUpdateSelectedAminoAcidIndex}
            onClick={this.handleAminoAcidSliderClick}
            marks={this.state.marks}
            showDNA={this.state.showingDNA}
            dimUnselected={this.state.showingInfoBox}
          />
          {
            aminoAcids2 &&
            <AminoAcidSlider
              aminoAcids={aminoAcids2}
              codons={codons2}
              width={width}
              aminoAcidWidth={aminoAcidWidth}
              selectionWidth={selectionWidth}
              selectionStartPercent={this.state.selectionStartPercent}
              updateSelectionStart={this.handleUpdateSelectionStart}
              selectedAminoAcidIndex={this.state.selectedAminoAcidIndex}
              updateSelectedAminoAcidIndex={this.handleUpdateSelectedAminoAcidIndex}
              onClick={this.handleAminoAcidSliderClick}
              marks={this.state.marks}
              dimUnselected={this.state.showingInfoBox}
              showDNA={this.state.showingDNA}
              highlightColor="4, 255, 0"
            />
          }
        </div>
        {this.state.showingInfoBox &&
          <InfoBox
            aminoAcids={aminoAcids}
            secondAminoAcids={aminoAcids2}
            selection={this.state.selectedAminoAcidIndex}
            selectedAminoAcidXLocation={this.state.selectedAminoAcidXLocation}
            marks={this.state.marks}
            onMarkLocation={this.handleMark}
            width={width - 26}
          />
        }
        <div>
          {
            getParameterByName('dnaSwitchable') &&
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.showingDNA}
                  onChange={this.handleDNAToggle}
                />
              }
              label="Show DNA"
            />
          }
        </div>
      </div>
    );
  }
}

ProteinViewer.propTypes = {
  dna: PropTypes.string,
  svgImage: PropTypes.string,
  dna2: PropTypes.string.isRequired,
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
