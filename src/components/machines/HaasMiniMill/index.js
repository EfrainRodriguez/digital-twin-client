import React from 'react';
// propo types
import PropTypes from 'prop-types';
// components
import { LoadFrom3MF } from '../../model-loaders';
// 3mf files
import base3MF from '../../../assets/machines/haas-minimill/base.3MF';
import enclosure from '../../../assets/machines/haas-minimill/enclosure.3MF';
import xAxis from '../../../assets/machines/haas-minimill/x-axis.3MF';
import yAxis from '../../../assets/machines/haas-minimill/y-axis.3MF';
import zAxis from '../../../assets/machines/haas-minimill/z-axis.3MF';
import toolHolder from '../../../assets/machines/haas-minimill/tool-holder.3MF';
import cutter from '../../../assets/machines/haas-minimill/cutter.3MF';
import door from '../../../assets/machines/haas-minimill/door.3MF';
import toolMagazine from '../../../assets/machines/haas-minimill/tool-magazine.3MF';

const HaasMiniMill = ({ showDoor, showEnclosure, positions }) => (
  <>
    <LoadFrom3MF model={base3MF} color="#000000" position={[0, 0, 0]} />
    {showEnclosure && <LoadFrom3MF model={enclosure} position={[0, 0, 0]} />}
    {showEnclosure && showDoor && (
      <LoadFrom3MF model={door} position={[0, 0, 0]} />
    )}
    <LoadFrom3MF model={xAxis} position={[positions.x, positions.y, 0]} />
    <LoadFrom3MF model={yAxis} position={[0, positions.y, 0]} />
    <LoadFrom3MF model={zAxis} position={[0, 0, positions.z]} />
    <LoadFrom3MF model={toolHolder} position={[0, 0, positions.z]} />
    <LoadFrom3MF model={cutter} position={[0, 0, positions.z]} />
    <LoadFrom3MF model={toolMagazine} position={[0, 0, 0]} />
  </>
);

HaasMiniMill.propTypes = {
  showDoor: PropTypes.bool,
  showEnclosure: PropTypes.bool,
  positions: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
};

export default HaasMiniMill;
