/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from 'react-redux';
import {compose, withProps} from 'recompose';


// NOTE: @mapstore is an alias in webpack config for /MapStore2/web/client, to access to the full framework library

// control actions/reducer
// it's useful to store simple setting like open closed dialogs and so on here, in order
// to be reset on map load
import { toggleControl } from '@mapstore/actions/controls';


import { createPlugin } from '@mapstore/utils/PluginsUtils';

// Dialog component
import Dialog from '@mapstore/components/misc/Dialog';

import { Glyphicon } from 'react-bootstrap';
/**
 * The effective dialog.
 */
const AboutDialog = ({ enabled, floatingStyle, modal, draggable, onClose }) => <Dialog
    style={{ zIndex: 1992, display: enabled ? "block" : "none", ...floatingStyle }}
    modal={modal}
    draggable={draggable}>
    <span role="header">
        <span className="settings-panel-title">About</span>
        <button onClick={onClose} className="settings-panel-close close"><Glyphicon glyph="1-close" /></button>
    </span>
    <div role="body">
        This is a sample MapStore project with some simple plugins that help you to learn and do exercises about MapStore.
    </div>
</Dialog>;

const About = compose(
    // connect the enabled props to the state and the close button to the toggleControl handler
    connect((state) => ({
        enabled: state.controls && state.controls.sampleAbout && state.controls.sampleAbout.enabled || false,
        withButton: false
    }), {
        onClose: toggleControl.bind(null, 'sampleAbout', null)
    }),
    // transform the floating option into needed properties for the dialog, to make it draggable, with the possibility to click on the center
    withProps(({floating}) => ({
        // These are the property changes to apply to the Dialog component to make it a draggable window.
        // TODO: this enhancer could be added to MapStore to allow quick configuration of dialogs.
        modal: floating ? false : true, // modal option, to make the window with a dark background
        draggable: floating ? true : false, // make the dialog draggable
        floatingStyle: floating ? {position: "fixed", top: "0%", left: "20%"} : {} // style adjustment to not fix to the center the window, when floating.
    }))
)(AboutDialog);

/**
 * A sample about window with an entry in menu.
 * This is a minimal plugin that :
 *  - shows an entry in the burger menu
 *  - when the entry is clicked, open a dialog with an about text
 *  - uses controls actions/reducer of mapstore to open/close the window
 *  - can be configured with "cfg" options
 * You can test even configuration with this plugin. Changing it in local config from "SampleAbout" into:
 * ```json
 * {
 *     "name": "SampleAbout",
 *     "cfg": {
 *         "floating": true
 *     }
 * }
 * ```
 * The window will become floating and draggable.
 * @name SampleAbout
 * @memberof js.plugins
 * @props {boolean} [cfg.floating=false] if true, makes this window floating.
 */
export default createPlugin("SampleAbout", {
    component: About,
    containers: {
        BurgerMenu: {
            name: 'about',
            position: 1500,
            text: "About this project",
            icon: <Glyphicon glyph="info-sign" />,
            action: toggleControl.bind(null, 'sampleAbout', null),
            priority: 1,
            doNotHide: true
        }
    }
});
