# docker build -t geoos/noaa-ww3:latest -t geoos/noaa-ww3:0.82 .
# docker push geoos/noaa-ww3:latest

FROM geoos/node14-python3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production

COPY . .
CMD ["node", "index"]