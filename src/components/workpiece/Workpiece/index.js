import React from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import * as THREE from 'three';
// components
import { LoadFromSTL } from '../../model-loaders';
// stl
import workpiece from '../../../assets/workpiece/standard-part/workpiece.STL';

const WorkPiece = ({ matrix }) => (
  <LoadFromSTL
    url={workpiece}
    matrix={matrix}
    material={new THREE.MeshPhongMaterial()}
  />
);

WorkPiece.propTypes = {
  matrix: PropTypes.array
};

export default WorkPiece;
