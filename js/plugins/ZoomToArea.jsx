import React from 'react';
import { connect } from 'react-redux';
import reducer from '../reducers/zoomtoarea';
import { zoomToExtent } from '../../MapStore2/web/client/actions/map.js';
import createSampleDialog from './utils/createSampleDialog';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
import { Glyphicon } from 'react-bootstrap';

const CONTROL_NAME = "zoom_to_area_dialog";

const Dialog = createSampleDialog(CONTROL_NAME);


const ZoomToArea = ({ zoomToExtentArea }) => (<Dialog id={CONTROL_NAME} floating title="Zoom To Area">
    <div>
        <button className="btn btn-primary" onClick={() => zoomToExtentArea([51.2867602, 51.6918741, -0.5103751, 0.3340155], 'EPSG:4326')}>Zoom to London</button>
    </div>

</Dialog>);


const mapStateToProps = state => ({
    extent: state.zoomtoarea.extent,
    crs: state.zoomtoarea.crs,
    zoom: state.zoomtoarea.zoom
});

// const mapDispatchToProps = () => zoomToExtent([51.2867602, 51.6918741, -0.5103751, 0.3340155], 'EPSG:4326');
const mapDispatchToProps = dispatch => ({
    zoomToExtentArea: (extent, crs, zoom) => dispatch(zoomToExtent(extent, crs, zoom))
});

const ZoomToAreaPlugin = connect(
    mapStateToProps,
    mapDispatchToProps
)(ZoomToArea);


// control actions/reducer
// it's useful to store simple setting like open closed dialogs and so on here, in order
// to be reset on map load
import { toggleControl } from '@mapstore/actions/controls';

/**
 * ZoomToAreaPlugin. A dialog window that can be opened from the burger menu.
 * This is a good point to start developing your plugin.
 * - Connect the state to ZoomToArea component
 * - Connect actions to dispatch to the ZoomToArea component (create an actionCreators file for custom actions)
 * - Edit your reducers/zoomtoarea.js file to handle the `zoomtoarea` piece of global redux state.
 * - Add epics...
 */
export default createPlugin("ZoomToArea", {
    component: ZoomToAreaPlugin,
    containers: {
        BurgerMenu: {
            name: 'Zoom To Area',
            position: 1500,
            text: "Zoom to Area",
            icon: <Glyphicon glyph="eye" />,
            action: toggleControl.bind(null, CONTROL_NAME, null),
            priority: 1,
            doNotHide: true
        }
    },
    reducers: {
        zoomtoarea: reducer // REDUCER will be used to create the `zoomtoarea` part of global redux state (keys of the "reducers" are pieces of state)
    }
});
