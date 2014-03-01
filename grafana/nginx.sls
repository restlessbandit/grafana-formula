/etc/nginx/blocks.d/grafana:
  file.managed:
    - source: salt://grafana/files/nginx-block
    - require:
      - file: /etc/nginx/blocks.d
