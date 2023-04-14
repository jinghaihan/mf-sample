FROM nginx:1.20.1-perl
RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone
COPY ./dist /usr/share/nginx/html/dist
COPY ./conf/nginx.conf /etc/nginx/nginx.conf