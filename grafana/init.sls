grafana-packages:
  pkg.latest:
    - name: grafana

grafana-settings:
  file.managed:
    - name: /usr/share/grafana/config.js
    - source: salt://grafana/files/config.js
    - template: jinja
    - require:
      - pkg: grafana-packages
