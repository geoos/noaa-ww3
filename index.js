const log = require("./lib/Logs")
const downloader = require("./lib/Downloader")

downloader.init();
log.info("NOAA-WW3 downloader initialized [0.89]");