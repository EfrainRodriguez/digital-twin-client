import { merge } from 'lodash';
import Input from './Input';
import Button from './Button';
import Container from './Container';
import Card from './Card';
import Drawer from './Drawer';
import Lists from './Lists';
import AppBar from './AppBar';
import Avatar from './Avatar';
import IconButton from './IconButton';
import Paper from './Paper';
import Popover from './Popover';
import Tabs from './Tabs';
import Switch from './Switch';
import Table from './Table';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Input(theme),
    Button(theme),
    Container(theme),
    Card(theme),
    Drawer(theme),
    Lists(theme),
    AppBar(theme),
    Avatar(theme),
    IconButton(theme),
    Paper(theme),
    Popover(theme),
    Tabs(theme),
    Switch(theme),
    Table(theme)
  );
}
