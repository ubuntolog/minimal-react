# Base image: Minimal Alpine Linux image with Java
FROM anapsix/alpine-java:8

RUN mkdir /root/minimal-react
ADD target/appassembler /root/minimal-react
RUN chmod a+x /root/minimal-react/bin/minimal-react
ADD minimal-react.yaml /root/

# run the application
CMD ["/root/minimalreact/bin/minimal-react",  "server", "/root/minimal-react.yaml"]
