/** @scratch /configuration/config.js/1
 * == Configuration
 * config.js is where you will find the core Grafana configuration. This file contains parameter that
 * must be set before kibana is run for the first time.
 */
define(['settings'],
function (Settings) {
  "use strict";

  return new Settings({

    /**
     * elasticsearch url:
     * For Basic authentication use: http://username:password@domain.com:9200
     */
    elasticsearch: "{{ pillar.get('grafana:elasticsearch-url', 'http://127.0.0.1:9200') }}",

    /**
     * graphite-web url:
     * For Basic authentication use: http://username:password@domain.com
     * Basic authentication requires special HTTP headers to be configured
     * in nginx or apache for cross origin domain sharing to work (CORS).
     * Check install documentation on github
     */
    graphiteUrl: "{{ pillar.get('grafana:graphite-url', 'http://127.0.0.1:9000') }}",

    /**
     * Multiple graphite servers? Comment out graphiteUrl and replace with
     *
     *  datasources: {
     *    data_center_us: { type: 'graphite',  url: 'http://<graphite_url>',  default: true },
     *    data_center_eu: { type: 'graphite',  url: 'http://<graphite_url>' }
     *  }
     */

    default_route: "{{ pillar.get('grafana:default-route', '/dashboard/file/default.json') }}",

    /**
     * If your graphite server has another timezone than you & users browsers specify the offset here
     * Example: "-0500" (for UTC - 5 hours)
     */
    timezoneOffset: null,

    grafana_index: "{{ pillar.get('grafana:index-name', 'grafana-dash') }}",

    /*
    panel_names: [
      'text',
      'graphite'
    ]
    */
    panel_names: [
    {-% set panel_names = pillar.get('grafana:panel-names', ['text', 'graphite'] %-}
    {-% if panel_names %-}
        '{{ panel_names[0] }}'
        {-% for name in panel_names[1:] %-}
        , '{{ name }}'
        {-% endfor %-}
    {-% endif %-}
  });
});
