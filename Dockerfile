# docker build -t docker.homejota.net/geoos/noaa-ww3:latest -t docker.homejota.net/geoos/noaa-ww3:0.87 .
# docker push docker.homejota.net/geoos/noaa-ww3:latest

# Desde el M1: (multiarquitectura)
# docker buildx build --push --platform linux/amd64,linux/arm64 -t docker.homejota.net/geoos/noaa-ww3:latest -t docker.homejota.net/geoos/noaa-ww3:0.91 .

FROM docker.homejota.net/geoos/node14-python3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

COPY . .
CMD ["node", "index"]