FROM nginx:1.13.3-alpine

ADD ./default.conf /etc/nginx/conf.d/

RUN cd /usr/share/nginx/html/ && mkdir client && cd /

COPY ./dist /usr/share/nginx/html/client/

WORKDIR /usr/share/nginx/html/

EXPOSE 80
