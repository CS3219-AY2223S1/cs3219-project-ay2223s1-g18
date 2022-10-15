FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf.template 

CMD envsubst '${USER_SERVICE_URL} ${MATCHING_SERVICE_URL} ${QUESTION_SERVICE_URL} ${USER_HISTORY_SERVICE_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'