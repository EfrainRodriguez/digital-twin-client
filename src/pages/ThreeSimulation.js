import { Suspense, useState, useEffect } from 'react';
// prop types
import PropTypes from 'prop-types';
// three js
import * as THREE from 'three';
import { TrackballControls, ContactShadows, Html } from '@react-three/drei';
// material ui
import {
  Box,
  Grid,
  Card,
  styled,
  Container,
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core';
// components
import {
  AxisHandler,
  HaasMiniMill,
  ThreeDViewer,
  Workpiece,
  RawPiece
} from '../components';

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

export default function ThreeSimulation({ client }) {
  const [positions, setPositions] = useState({
    x: 0,
    y: 0,
    z: 0
  });
  const [showEnclosure, setShowEnclosure] = useState(true);
  const [showDoor, setShowDoor] = useState(true);
  const [showRawpiece, setShowRawpiece] = useState(false);
  const [showWokpiece, setShowWorkpiece] = useState(false);

  const handleAxisChange = (axis, position) => {
    setPositions({ ...positions, [axis]: position });
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        // client.subscribe('test');
        client.subscribe('haas/minimill/position');
      });
      client.on('error', (error) => {
        console.log('error', error);
        client.end();
      });
      client.on('message', (topic, message) => {
        console.log(message.toString());
        // handleAxisChange('x', message.toString().split(';')[0]);
        setPositions({
          x: message.toString().split(';')[0],
          y: message.toString().split(';')[1],
          z: message.toString().split(';')[2] + 300
        });
      });
    }
  }, [client]);

  return (
    <Container sx={{ height: '100%' }}>
      <Grid container spacing={3} height="100%">
        {/* <Box mb={2} width="100%">
          <Typography align="center" variant="h2">
            CNC Machine Simulation
          </Typography>
        </Box> */}
        <Grid item sm={12} md={4} lg={4}>
          <ControlPanel>
            <ControlBox>
              <AxisHandler
                min={-350}
                max={70} // 750 mm
                label="X-Axis"
                onChange={(e) => handleAxisChange('x', -e)}
              />
            </ControlBox>
            <ControlBox>
              <AxisHandler
                min={-400}
                max={100}
                label="Y-Axis"
                buttonText="Y" // 280 mm
                onChange={(e) => handleAxisChange('y', e)}
              />
            </ControlBox>
            <ControlBox>
              <AxisHandler
                min={-50}
                max={250} // 370 mm
                label="Z-Axis"
                buttonText="Z"
                onChange={(e) => handleAxisChange('z', e)}
              />
            </ControlBox>
            <Grid>
              <Button onClick={() => setShowEnclosure(!showEnclosure)}>
                {showEnclosure ? 'Hide enclosure' : 'Show enclosure'}
              </Button>
              {showEnclosure && (
                <Button onClick={() => setShowDoor(!showDoor)}>
                  {showDoor ? 'Hide door' : 'Show door'}
                </Button>
              )}
            </Grid>
            <Grid>
              <Button onClick={() => setShowWorkpiece(!showWokpiece)}>
                {showWokpiece ? 'Hide workpiece' : 'Show workpiece'}
              </Button>
              <Button onClick={() => setShowRawpiece(!showRawpiece)}>
                {showRawpiece ? 'Hide rawpiece' : 'Show rawpiece'}
              </Button>
            </Grid>
          </ControlPanel>
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <ThreeDViewer>
            {/* <color attach="background" args={['#2a3b4c']} /> */}
            <Suspense
              fallback={
                <Html>
                  <Box textAlign="center" minWidth="150px">
                    <CircularProgress />
                    <Typography display="block" variant="caption">
                      loading machine...
                    </Typography>
                  </Box>
                </Html>
              }
            >
              <HaasMiniMill
                showDoor={showDoor}
                showEnclosure={showEnclosure}
                positions={positions}
              />
              {showWokpiece && (
                <Workpiece
                  matrix={new THREE.Matrix4().set(
                    1,
                    0,
                    0,
                    positions.x,
                    0,
                    0,
                    1,
                    966.5,
                    0,
                    -1,
                    0,
                    300 + positions.y,
                    0,
                    0,
                    0,
                    1
                  )}
                />
              )}
              {showRawpiece && (
                <RawPiece
                  matrix={new THREE.Matrix4().set(
                    1,
                    0,
                    0,
                    positions.x,
                    0,
                    0,
                    1,
                    966.5,
                    0,
                    -1,
                    0,
                    300 + positions.y,
                    0,
                    0,
                    0,
                    1
                  )}
                />
              )}
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
          </ThreeDViewer>
        </Grid>
      </Grid>
    </Container>
  );
}

ThreeSimulation.propTypes = {
  client: PropTypes.object
};
