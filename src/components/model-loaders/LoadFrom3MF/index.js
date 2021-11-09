import React, { useRef } from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/loaders/3MFLoader';
import { useLoader } from '@react-three/fiber';

const LoadFrom3MF = ({ model, position }) => {
  const ref = useRef();
  const geometry = useLoader(ThreeMFLoader, model);
  return (
    <group
      ref={ref}
      updateMatrix={() =>
        (ref.current.matrix = new THREE.Matrix4().set(
          1,
          0,
          0,
          position[0],
          0,
          1,
          0,
          position[2],
          0,
          0,
          1,
          position[1],
          0,
          0,
          0,
          1
        ))
      }
    >
      <primitive object={geometry} />
    </group>
  );
};

LoadFrom3MF.propTypes = {
  model: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default LoadFrom3MF;
