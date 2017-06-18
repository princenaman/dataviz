'use strict'

const Trivago = use('App/Model/Trivago')
const Database = use('Database')

class PredictionController {

    constructor() {

    }

    * index (request, response) {

      yield response.sendView('predictions')

    }

    * store (request, response) {

      var AWS = require('aws-sdk')
      AWS.config.update({region: 'us-east-1'});
      var machinelearning = new AWS.MachineLearning({apiVersion: '2014-12-12', region: "us-east-1"});
      var params = {
        MLModelId: 'ml-z2btNNPd0sY', /* required */
        PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com', /* required */
        Record: {
        "week": request.input('week'),
        "platform": request.input('platform'),
        "hotel": request.input('hotel'),
        "city": request.input('city'),
        "stars": request.input('stars'),
        "rating": request.input('rating'),
        "user_interaction_index": request.input('user_interaction_index')
        }
      };
      let predictedValue = 0
      machinelearning.predict(params, function(err, data) {
        if (err)
          console.log(err, err.stack);
        else{
            predictedValue = data['Prediction']['predictedValue']
            response.ok(predictedValue)
        }
      });
    }

}

module.exports = PredictionController
