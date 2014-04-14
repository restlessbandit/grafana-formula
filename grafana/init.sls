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

grafana-favicon:
  file.managed:
    - name: /var/www/grafana.ico
    - source: salt://grafana/files/grafana.ico

