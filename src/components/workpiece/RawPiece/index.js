import React from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import * as THREE from 'three';
// components
import { LoadFromSTL } from '../../model-loaders';
// stl
import rawpiece from '../../../assets/workpiece/standard-part/rawpiece.STL';

const RawPiece = ({ matrix }) => (
  <LoadFromSTL
    url={rawpiece}
    matrix={matrix}
    material={
      new THREE.MeshPhongMaterial({
        color: '#ff00ff',
        opacity: 0.5,
        transparent: true
      })
    }
  />
);

RawPiece.propTypes = {
  matrix: PropTypes.array
};

export default RawPiece;
