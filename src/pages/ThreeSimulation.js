import { Suspense, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import {
  TrackballControls,
  ContactShadows,
  Environment
} from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
// prop types
import PropTypes from 'prop-types';
// material ui
import {
  Box,
  Grid,
  Card,
  styled,
  Container,
  Typography
} from '@material-ui/core';
// components
import { AxisHandler } from '../components';
// stl files
import base from '../assets/models/HaasMiniMill-base.STL';
import xAxis from '../assets/models/HaasMiniMill-x-axis.STL';
import yAxis from '../assets/models/HaasMiniMill-y-axis.STL';
import zAxis from '../assets/models/HaasMiniMill-z-axis.STL';

// ----------------------------------------------------------------

const ControlPanel = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const ControlBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2, 5, 0),
  marginBottom: theme.spacing(2)
}));

// ----------------------------------------------------------------

export const Model = ({ url, position, color }) => {
  const geom = useLoader(STLLoader, url);

  const ref = useRef();

  return (
    <>
      <mesh
        ref={ref}
        matrixAutoUpdate
        updateMatrix={() =>
          (ref.current.matrix = new THREE.Matrix4().set(
            1,
            0,
            0,
            position[0],
            0,
            0,
            1,
            position[2],
            0,
            -1,
            0,
            -position[1],
            0,
            0,
            0,
            1
          ))
        }
      >
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};

export default function ThreeSimulation() {
  const [positions, setPositions] = useState({
    x: 0,
    y: 0,
    z: 0
  });

  const handleAxisChange = (axis, position) => {
    setPositions({ ...positions, [axis]: position });
  };

  return (
    <Container sx={{ height: '100%' }}>
      <Grid container spacing={3} height="100%">
        <Box mb={2} width="100%">
          <Typography align="center" variant="h2">
            CNC Machine Simulation
          </Typography>
        </Box>
        <Grid item sm={12} md={4} lg={4}>
          <ControlPanel>
            <ControlBox>
              <AxisHandler
                min={-600}
                max={200}
                label="X-Axis"
                onChange={(e) => handleAxisChange('x', -e)}
              />
            </ControlBox>
            <ControlBox>
              <AxisHandler
                min={-300}
                max={100}
                label="Y-Axis"
                buttonText="Y"
                onChange={(e) => handleAxisChange('y', -e)}
              />
            </ControlBox>
            <ControlBox>
              <AxisHandler
                min={-250}
                max={100}
                label="Z-Axis"
                buttonText="Z"
                onChange={(e) => handleAxisChange('z', e)}
              />
            </ControlBox>
          </ControlPanel>
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <Canvas
            dpr={[1, 2]}
            camera={{
              fov: 35,
              position: [1500, 1000, 4500],
              far: 50000
            }}
          >
            {/* <color attach="background" args={['#2a3b4c']} /> */}
            <Suspense fallback={null}>
              <Model url={base} position={[0, 0, 0]} color="#BFBFBF" />
              <Model
                url={xAxis}
                position={[positions.x, positions.y, 0]}
                color="#BFBFBF"
              />
              <Model
                url={yAxis}
                position={[0, positions.y, 0]}
                color="#BFBFBF"
              />
              <Model
                url={zAxis}
                position={[0, 0, positions.z]}
                color="#BFBFBF"
              />
              <Environment preset="city" />
            </Suspense>
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -4.5, 0]}
              opacity={1}
              width={20}
              height={20}
              blur={2}
              far={4.5}
            />
            <TrackballControls zoomSpeed={5} rotateSpeed={3} />
          </Canvas>
        </Grid>
      </Grid>
    </Container>
  );
}

Model.propTypes = {
  url: PropTypes.string.isRequired,
  position: PropTypes.array.isRequired,
  color: PropTypes.string
};
