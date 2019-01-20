# Base image: Minimal Alpine Linux image with Java
FROM anapsix/alpine-java:8

RUN mkdir /root/minimalreact
ADD target/appassembler /root/minimalreact
RUN chmod a+x /root/minimalreact/bin/minimalreact
ADD minimal-react.yaml /root/

# run the application
CMD ["/root/minimalreact/bin/minimalreact",  "server", "/root/minimal-react.yaml"]
