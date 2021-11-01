import React from 'react';
import mqtt from 'mqtt';
import ThreeSimulation from './ThreeSimulation';

const SimulationContainer = () => {
  const client = mqtt.connect('ws://localhost:7777');
  return <ThreeSimulation client={client} />;
};

export default SimulationContainer;
