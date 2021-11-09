import React from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';

const ThreeDViewer = ({ children, ...rest }) => (
  <Canvas
    dpr={[1, 2]}
    camera={{
      fov: 35,
      position: [1500, 3000, 6000],
      far: 50000
    }}
    onCreated={({ scene, camera }) => {
      camera.add(new THREE.PointLight(0xffffff, 1));
      camera.lookAt(new THREE.Vector3(0, 3000, 0));
      camera.updateProjectionMatrix();
      scene.add(camera);
    }}
    {...rest}
  >
    {children}
  </Canvas>
);

ThreeDViewer.propTypes = {
  children: PropTypes.node
};

export default ThreeDViewer;
