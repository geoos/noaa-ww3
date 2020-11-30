# docker build -t docker.homejota.net/geoos/noaa-ww3:latest -t docker.homejota.net/geoos/noaa-ww3:0.86 .
# docker push docker.homejota.net/geoos/noaa-ww3:latest

FROM docker.homejota.net/geoos/node14-python3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

COPY . .
CMD ["node", "index"]