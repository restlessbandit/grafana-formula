grafana:
  git.latest:
    - name: https://github.com/torkelo/grafana.git
    - rev: master
    - target: /var/www/grafana
    - force: True

grafana-settings:
  file.managed:
    - name: /var/www/grafana/src/config.js
    - source: salt://grafana/files/config.js
    - template: jinja
    - require:
      - git: grafana

grafana-favicon:
  file.managed:
    - name: /var/www/grafana.ico
    - source: salt://grafana/files/grafana.ico

