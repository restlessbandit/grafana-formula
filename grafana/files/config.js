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
    elasticsearch: "https://elasticlog.yandex.net:9443",

    /**
     * graphite-web url:
     * For Basic authentication use: http://username:password@domain.com
     * Basic authentication requires special HTTP headers to be configured
     * in nginx or apache for cross origin domain sharing to work (CORS).
     * Check install documentation on github
     */
    /* graphiteUrl: "https://"+window.location.hostname, */

    /**
     * Multiple graphite servers? Comment out graphiteUrl and replace with
     *
     *  datasources: {
     *    data_center_us: { type: 'graphite',  url: 'http://<graphite_url>',  default: true },
     *    data_center_eu: { type: 'graphite',  url: 'http://<graphite_url>' }
     *  }
     */
    datasources: {
	{% for name, url in salt['pillar.get']('grafana:datasources').items() -%}
	'{{ name }}': { type: 'graphite', url: '{{ url }}'
		{%- if salt['pillar.get']('grafana:datasource-default','_self') == name -%}
		, default: true
		{%- endif -%}
	},
	{% endfor -%}
        '_self': { type: 'graphite', url: 'https://'+window.location.hostname
		{%- if salt['pillar.get']('grafana:datasource-default','_self') == '_self' -%}
		, default: true
		{%- endif -%}
        }
    },

    default_route: '/dashboard/file/default.json',

    /**
     * If your graphite server has another timezone than you & users browsers specify the offset here
     * Example: "-0500" (for UTC - 5 hours)
     */
    timezoneOffset: null,

    grafana_index: "grafana-dash",

    panel_names: [
      'text',
      'graphite'
    ]
  });
});
