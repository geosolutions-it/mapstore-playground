/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
const {createPlugin} = require('../../MapStore2/web/client/utils/PluginsUtils');

class Minimal extends React.Component {
    render() {
        const style = { position: "absolute", top: "100px", left: "100px", zIndex: 10000000, background: "white" };
        return <div style={style}>Minimal</div>;
    }
}
/**
 * Smallest plugin you can imagine.
 * A "Sample" div fixed on the screen
 * Here you can see the minimal structure of a plugin.
 * You can add it to (desktop) entry of the "plugins" configuration in localConfig.json
 * ```
 * {
 *    "plugins": {
 *        "desktop": [
 *            // plugins ...
 *           "Minimal",
 *           // other plugins
 *        ]
 *    }
 * }
 * ```
 */
export default createPlugin("Minimal", {
    component: Minimal
});
