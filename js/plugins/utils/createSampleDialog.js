import React from 'react';
import { connect } from 'react-redux';
import { compose, withProps } from 'recompose';


import { toggleControl } from '@mapstore/actions/controls';

// Dialog component
import Dialog from '@mapstore/components/misc/Dialog';
import { Glyphicon } from 'react-bootstrap';

/**
 * The effective dialog.
 */
const ContainerDialog = ({ title = "Dialog", enabled, floatingStyle, modal, draggable, onClose, children }) => <Dialog
    style={{ zIndex: 1992, display: enabled ? "block" : "none", ...floatingStyle }}
    modal={modal}
    draggable={draggable}>
    <span role="header">
        <span className="settings-panel-title">{title}</span>
        <button onClick={onClose} className="settings-panel-close close"><Glyphicon glyph="1-close" /></button>
    </span>
    <div role="body">
        {children}
    </div>
</Dialog>;

export default (controlName) => compose(
    // connect the enabled props to the state and the close button to the toggleControl handler
    connect((state) => ({
        enabled: state.controls && state.controls[controlName] && state.controls[controlName].enabled || false,
        withButton: false
    }), {
        onClose: toggleControl.bind(null, controlName, null)
    }),
    // transform the floating option into needed properties for the dialog, to make it draggable, with the possibility to click on the center
    withProps(({ floating }) => ({
        // These are the property changes to apply to the Dialog component to make it a draggable window.
        // TODO: this enhancer could be added to MapStore to allow quick configuration of dialogs.
        modal: floating ? false : true, // modal option, to make the window with a dark background
        draggable: floating ? true : false, // make the dialog draggable
        floatingStyle: floating ? { position: "fixed", top: "0%", left: "20%" } : {} // style adjustment to not fix to the center the window, when floating.
    }))
)(ContainerDialog);
