/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

const CONTROL_NAME = "playground_dialog";
import { connect } from 'react-redux';

import createSampleDialog from './utils/createSampleDialog';
const Dialog = createSampleDialog(CONTROL_NAME);
import { createPlugin } from '@mapstore/utils/PluginsUtils';

// HERE YOUR ROOT PLUGIN COMPONENT
const Playground = ({text}) => (<Dialog floating>
    <div><b>Write your plugin content here</b></div>
    <div>Here some sample data from the plugins state: {text}</div>
</Dialog>);

import { Glyphicon } from 'react-bootstrap';

// this is the empty reducer file to work with.
import reducer from '../reducers/playground';

// SAMPLE CONNECTIONS TO THE STATE
const ConnectedPlugin = connect(state => ({
    text: state.playground.text // <-- SAMPLE CONNECTION TO THE playground redux state
}))(Playground);


// control actions/reducer
// it's useful to store simple setting like open closed dialogs and so on here, in order
// to be reset on map load
import { toggleControl } from '@mapstore/actions/controls';

/**
 * PlaygroundPlugin. A dialog window that can be opened from the burger menu.
 * This is a good point to start developing your plugin.
 * - Connect the state to Playground component
 * - Connect actions to dispatch to the Playground component (create an actionCreators file for custom actions)
 * - Edit your reducers/playground.js file to handle the `playground` piece of global redux state.
 * - Add epics...
 */
export default createPlugin("Playground", {
    component: ConnectedPlugin,
    containers: {
        BurgerMenu: {
            name: 'about',
            position: 1500,
            text: "Playground plugin",
            icon: <Glyphicon glyph="heart" />,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1,
            doNotHide: true
        }
    },
    reducers: {
        playground: reducer // REDUCER will be used to create the `playground` part of global redux state (keys of the "reducers" are pieces of state)
    }
});
