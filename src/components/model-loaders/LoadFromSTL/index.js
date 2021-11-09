import React, { useRef } from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const LoadFromSTL = ({ url, color, updateMatrix, ...rest }) => {
  const ref = useRef();
  const geometry = useLoader(STLLoader, url);
  return (
    <>
      <mesh
        ref={ref}
        matrixAutoUpdate
        updateMatrix={() => (ref.current.matrix = updateMatrix)}
        {...rest}
      >
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

LoadFromSTL.propTypes = {
  url: PropTypes.string.isRequired,
  color: PropTypes.string,
  updateMatrix: PropTypes.func.isRequired
};

export default LoadFromSTL;
