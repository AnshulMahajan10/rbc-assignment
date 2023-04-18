const express = require("express");
const router = express.Router();
const jsonData = require('../data/data.json');
const RecordModel = require("../models/Record");
let _ =  require('lodash');
const winston = require('winston');


const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'logs/logs.log'
        })
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};
const logger = winston.createLogger(logConfiguration);

router.route("/JSON").get((req, res) => {
  
    if(!req.query.startDate || !req.query.endDate || !req.query.selectedField)
    {
        res.status(400);
        logger.log({
          message: JSON.stringify(req.query)+'400 Error',
          level: 'error'
      })
    }
    
   if(req.query.selectedField === 'phonenumber'){
    const tempres = jsonData.filter(record => (record.devices.phone === req.query.searchValue && record.originationTime >= req.query.startDate && record.originationTime <= req.query.endDate));
    res.json(tempres);
   }
   else if (req.query.selectedField === 'voicemail'){
    const tempres = jsonData.filter(record => (record.devices.voicemail === req.query.searchValue && record.originationTime >= req.query.startDate && record.originationTime <= req.query.endDate));
    res.json(tempres);
   }
   else if (req.query.selectedField === 'clusterId'){
    const tempres = jsonData.filter(record => (record.clusterId === req.query.searchValue && record.originationTime >= req.query.startDate && record.originationTime <= req.query.endDate));
    res.json(tempres);
   }
   else if (req.query.selectedField === 'userId'){
    const tempres = jsonData.filter(record => (record.userId === req.query.searchValue && record.originationTime >= req.query.startDate && record.originationTime <= req.query.endDate));
    res.json(tempres);
   }
});


router.route("/MONGO").get((req, res) => {
  
  const page = _.get(req.query.page) ? _.get(req.query.page) : 0;

  if(!req.query.startDate || !req.query.endDate || !req.query.selectedField)
  {
      res.status(400);
      logger.log({
        message: JSON.stringify(req.query)+'400 Error',
        level: 'error'
    })
  }
    else if(req.query.selectedField === 'phonenumber'){
    RecordModel.find( { $and: [ { "devices.phone": req.query.searchValue }, {"originationTime": { $gte: req.query.startDate }}, {"originationTime": { $lte: req.query.endDate }}]}).limit(100)
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((err) =>   logger.log({
      message: err,
      level: 'error'
  }));
}

else if(req.query.selectedField === 'clusterId'){
    RecordModel.find({ $and: [ { "clusterId": req.query.searchValue }, {"originationTime": { $gte: req.query.startDate }}, {"originationTime": { $lte: req.query.endDate }}]}).limit(100)
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((err) => logger.log({
      message: err,
      level: 'error'
  }));
}

else if(req.query.selectedField === 'userId'){
    RecordModel.find({ $and: [ { "userId": req.query.searchValue }, {"originationTime": { $gte: req.query.startDate }}, {"originationTime": { $lte: req.query.endDate }}]}).limit(100)
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((err) => logger.log({
      message: err,
      level: 'error'
  }));
}

else if(req.query.selectedField === 'voicemail'){
    RecordModel.find({ $and: [ { "devices.voicemail": req.query.searchValue }, {"originationTime": { $gte: req.query.startDate }}, {"originationTime": { $lte: req.query.endDate }}]}).limit(100)
    .then((records) => {
      res.json(records).status(200);
    })
    .catch((err) => logger.log({
      message: err,
      level: 'error'
  }));
}
   
});

module.exports = router;