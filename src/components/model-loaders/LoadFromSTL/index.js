import React, { useRef } from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const LoadFromSTL = ({ url, material, matrix, ...rest }) => {
  const ref = useRef();
  const geometry = useLoader(STLLoader, url);
  return (
    <>
      <mesh
        ref={ref}
        matrixAutoUpdate
        updateMatrix={() => (ref.current.matrix = matrix)}
        material={material}
        {...rest}
      >
        <primitive object={geometry} attach="geometry" />
      </mesh>
    </>
  );
};

LoadFromSTL.propTypes = {
  url: PropTypes.string.isRequired,
  material: PropTypes.object,
  matrix: PropTypes.func.isRequired
};

export default LoadFromSTL;
