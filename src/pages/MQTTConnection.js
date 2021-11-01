import React, { useEffect } from 'react';
// mqtt
import mqtt from 'mqtt';

// const MQTTConnection = () => {
//   const client = mqtt.connect('ws://localhost:7777');
//   useEffect(() => {
//     if (client) {
//       client.on('connect', () => {
//         client.subscribe('test');
//       });
//       client.on('error', (error) => {
//         console.log('error', error);
//         client.end();
//       });
//       client.on('message', (topic, message) => {
//         console.log(message.toString());
//       });
//     }
//   }, [client]);
//   return <div>mqtt</div>;
// };

const MQTTConnection = () => <div>algo</div>;

export default MQTTConnection;
