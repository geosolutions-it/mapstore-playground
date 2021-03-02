/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ConfigUtils = require('@mapstore/utils/ConfigUtils');
/**
 * Add custom (overriding) translations with:
 *
 * ConfigUtils.setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);
 */
ConfigUtils.setConfigProp('translationsPath', './MapStore2/web/client/translations');
ConfigUtils.setConfigProp('themePrefix', 'mapstore-playground');

/**
 * Use a custom plugins configuration file with:
 *
 * ConfigUtils.setLocalConfigurationFile('localConfig.json');
 */
// ConfigUtils.setLocalConfigurationFile('MapStore2/web/client/localConfig.json');
ConfigUtils.setLocalConfigurationFile('localConfig.json');

/**
 * Use a custom application configuration file with:
 *
 * const appConfig = require('./appConfig');
 *
 * Or override the application configuration file with (e.g. only one page with a map viewer):
 *
 * const appConfig = assign({}, require('@mapstore/product/appConfig'), {
 *     pages: [{
 *         name: "mapviewer",
 *         path: "/",
 *         component: require('@mapstore/product/pages/MapViewer')
 *     }]
 * });
 */
const appConfig = require('@mapstore/product/appConfig');

/**
 * Add custom plugins to default ones.
 * Here import mapstore plugins directly.
 * For optimization, do not import unused plugins
 */
const plugins = require('@mapstore/product/plugins');

// Sample plugins
const Minimal = require('./plugins/Minimal').default;
const SampleAbout = require('./plugins/SampleAbout').default;
const Playground = require('./plugins/Playground').default;
const ZoomToArea = require('./plugins/ZoomToArea').default;
const appPlugins = {
    plugins: {
        ...plugins.plugins,
        // custom plugins:
        // MinimalPlugin, that has the minimal skeleton of a starter plugin
        MinimalPlugin: Minimal,
        // SampleAbout is a minimal plugin with a dialog that can be opened from the burger menu
        SampleAbout: SampleAbout,
        // Playground is an empty template plugin with reducer, ready for exercise.
        PlaygroundPlugin: Playground,
        ZoomToAreaPlugin: ZoomToArea
    },
    requires: plugins.requires
};
require('@mapstore/product/main')(appConfig, appPlugins);
