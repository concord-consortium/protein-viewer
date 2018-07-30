import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AminoAcidSlider from './amino-acid-slider'
import Protein from './protein'
import InfoBox from './info-box';
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
      marks: []
    };

    this.handleUpdateSelectionStart = this.handleUpdateSelectionStart.bind(this);
    this.handleAnimateToSelectionStart = this.handleAnimateToSelectionStart.bind(this);
    this.handleUpdateSelectedAminoAcidIndex = this.handleUpdateSelectedAminoAcidIndex.bind(this);
    this.handleAminoAcidSliderClick = this.handleAminoAcidSliderClick.bind(this);
    this.handleMark = this.handleMark.bind(this);
    this.animate = this.animate.bind(this);
  }

  handleUpdateSelectionStart(selectionStartPercent) {
    this.setState({
      animating: false,
      selectionStartPercent
    });
  }

  handleAnimateToSelectionStart(selectionStartPercentTarget) {
    this.setState({
      animating: true,
      selectionStartPercentTarget
    }, this.animate);
  }

  animate() {
    const {selectionStartPercent, selectionStartPercentTarget, animating} = this.state;
    if (!animating) return;
    let speed;
    if (selectionStartPercent > selectionStartPercentTarget) {
      speed = Math.max(-0.02, selectionStartPercentTarget - selectionStartPercent);
    } else {
      speed = Math.min(0.02, selectionStartPercentTarget - selectionStartPercent);
    }
    this.setState({selectionStartPercent: selectionStartPercent + speed});
    if (selectionStartPercentTarget - selectionStartPercent !== 0) {
      window.requestAnimationFrame(this.animate);
    }
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

    const { onMark } = this.props;
    if (onMark) {
      onMark(existingMarks);
    }

    this.setState({
      marks: existingMarks
    });
  }

  handleDNAToggle = () => {
    this.props.toggleShowDNA();
  }

  handleAminoAcidsToggle = () => {
    this.props.toggleShowingAminoAcidsOnProtein();
  }

  render() {
    const {
      selectionWidth, dna, dna2, aminoAcidWidth, width,
      svgImage, svgImage2, showDNA, showAminoAcidsOnProtein, dnaSwitchable
    } = this.props;

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
            updateSelectionStart={this.handleAnimateToSelectionStart}
            selectionPercent={protein1SelectionPercent}
            viewBox="0 0 222 206"
            svg={svgImage}
            marks={this.state.marks.map(loc => (loc + 0.5) / aminoAcids.length)}
            aminoAcids={aminoAcids}
            showAminoAcids={showAminoAcidsOnProtein}
          />
          { svgImage2 &&
            <Protein
              width={260}
              selectionStartPercent={this.state.selectionStartPercent}
              updateSelectionStart={this.handleAnimateToSelectionStart}
              selectionPercent={protein2SelectionPercent}
              viewBox="0 0 222 206"
              highlightColor="4, 255, 0"
              svg={svgImage2}
              marks={this.state.marks.map(loc => (loc + 0.5) / aminoAcids2.length)}
              aminoAcids={aminoAcids}
              showAminoAcids={showAminoAcidsOnProtein}
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
            showDNA={showDNA}
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
              showDNA={showDNA}
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
            dnaSwitchable &&
            <FormControlLabel
              control={
                <Checkbox
                  checked={showDNA}
                  onChange={this.handleDNAToggle}
                />
              }
              label="Show DNA"
            />
          }
          <FormControlLabel
            control={
              <Checkbox
                checked={showAminoAcidsOnProtein}
                onChange={this.handleAminoAcidsToggle}
              />
            }
            label="Show Amino Acids on Protein"
          />
        </div>
      </div>
    );
  }
}

ProteinViewer.propTypes = {
  dna: PropTypes.string,
  svgImage: PropTypes.string,
  dna2: PropTypes.string,
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
  selectionWidth: PropTypes.number,
  /** Whether DNA is initially visible */
  showDNA: PropTypes.bool,
  /** Whether "string of beads" amino acids are visible */
  showAminoAcidsOnProtein: PropTypes.bool,
  /** Whether user can toggle DNA */
  dnaSwitchable: PropTypes.bool,
  toggleShowDNA: PropTypes.func,
  toggleShowingAminoAcidsOnProtein: PropTypes.func
};

ProteinViewer.defaultProps = {
  width: 600,
  selectionWidth: 220,
  aminoAcidWidth: 17,
  codonWidth: 29,
  showDNA: false,
  showAminoAcidsOnProtein: false,
  dnaSwitchable: true
};


export default ProteinViewer;
