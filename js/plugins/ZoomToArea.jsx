import React, { useState }  from 'react';
import { connect } from 'react-redux';
import reducer from '../reducers/zoomtoarea';
import createSampleDialog from './utils/createSampleDialog';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
import { Glyphicon } from 'react-bootstrap';
import { zoomToExtent } from '@mapstore/actions/map.js';
import { toggleControl } from '@mapstore/actions/controls';

const CONTROL_NAME = "zoom_to_area_dialog";

const Dialog = createSampleDialog(CONTROL_NAME);
const styles = {
    wrap: {
        margin: '0 auto',
        display: 'block',
        textAlign: 'center'
    },
    select: {
        margin: '30px'
    }
};

const ZoomToArea = ({ zoomToExtentArea, pluginCfg }) => {
    const { citiesExtent, crs, maxZoom } = pluginCfg;
    const [isEnabled, toggleEnable] = useState(false);
    const [extent, setExtent] = useState('');
    return (<Dialog id={CONTROL_NAME} floating title="Zoom To Area">
        <div style={styles.wrap}>
            <select style={styles.select} onChange={(e) => {
                toggleEnable(e.target.value.length > 0 ? true : false);
                setExtent(JSON.parse(e.target.value));
            }}>
                <option value="">Choose a city...</option>
                {citiesExtent && citiesExtent.map((item, i) => <option key={i} value={item.extent}>{item.city}</option>)}
            </select>
            <button className="btn btn-primary" disabled={!isEnabled} onClick={() => zoomToExtentArea(extent, crs, maxZoom)}>Zoom</button>
        </div>
    </Dialog>);
};

const mapStateToProps = state => ({
    extent: state.zoomtoarea.extent,
    crs: state.zoomtoarea.crs,
    zoom: state.zoomtoarea.zoom
});

const mapDispatchToProps = dispatch => ({
    zoomToExtentArea: (extent, crs, zoom) => dispatch(zoomToExtent(extent, crs, zoom))
});

const ZoomToAreaPlugin = connect(
    mapStateToProps,
    mapDispatchToProps
)(ZoomToArea);

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
        zoomtoarea: reducer
    }
});
