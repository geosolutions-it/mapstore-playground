const { ZOOM_TO_EXTENT } = require('../../MapStore2/web/client/actions/map');


function zoomtoarea(state = { extent: null, crs: null, maxZoom: null }, action) {
    switch (action.type) {
    case ZOOM_TO_EXTENT:
        return Object.assign({}, state,  {
            extent: action.extent,
            crs: action.crs,
            maxZoom: action.maxZoom
        });
    default:
        return state;
    }
}

module.exports = zoomtoarea;
