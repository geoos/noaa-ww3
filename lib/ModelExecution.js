const config = require("./Config");
const url = require("url");
const http = require("https");

class ModelExecution {
    constructor(time) {
        this.time = time;
        let hours = this.time.hours();
        if (hours % 6) {
            hours = 6 * parseInt(hours / 6);
            this.time.hours(hours);
        }
    }

    getNOAAUrl(forecastHour, extension) {  
        if (extension === undefined) extension = "";      
        let hh = "" + forecastHour;
        if (hh.length < 3) hh = "0" + hh;
        if (hh.length < 3) hh = "0" + hh;
        //return config.NOAAGSF4Url + "multi_1." + this.time.format("YYYYMMDD") + "/multi_1.glo_30m.t" + this.time.format("HH") + "z.f" + hh + extension;

        // https://nomads.ncep.noaa.gov/pub/data/nccf/com/gfs/prod/gfs.20210618/12/wave/gridded/gfswave.t12z.global.0p25.f000.grib2
        let HH = this.time.format("HH"); // Model execution
        return config.NOAAGSF4Url + "gfs." + this.time.format("YYYYMMDD") + "/" + HH + "/wave/gridded/gfswave.t" + HH + "z.global.0p25.f" + hh + ".grib2";
    }

    isPublished() {
        return new Promise((resolve, reject) => {            
            let testUrl = this.getNOAAUrl(183, ".grib2.idx");
            let parsed = url.parse(testUrl);
            let options = {
                method:"HEAD",
                host:parsed.host,
                path: parsed.pathname,
                protocol:parsed.protocol
            };
            try {
                let req = http.request(options, r => {
                    if (r.statusCode == 200) {
                        resolve(true);
                    } else if (r.statusCode == 404) {
                        resolve(false);
                    } else {
                        reject("[" + r.statusCode + "] " + r.statusMessage);
                    }
                });
                req.end();
            } catch(error) {
                reject(error);
            }
        });        
    }

    dec() {
        this.time.subtract(6, "hours");
    }
}

module.exports = ModelExecution;