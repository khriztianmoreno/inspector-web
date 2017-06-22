'use strict';

const _ = require('lodash');
const moment = require("moment");

import MileageSnapshot from './mileageSnapshot.model';


/**
 * Consultar el promedio de kilomentros entre el snapshot anterior y el actual
 *
 * @param req {object}
 */
export function averageMileageDay(req){
  // 1. Consultar el snapshot anterior de ese vehiculo
  // 2. Cantidad de dias entre la fecha del snapshot anterior y la de hoy
  // 3. Diferencia de los kilometrajes del snapshot anterior y el actual
  // 4. Dividir punto 3 entre punto 2, para obtener el kilometraje promedio por dia

  let localId, mileage, query;

  if (req.body) {
    localId = req.body.localId;
    mileage = req.body.actualMileage;
  } else{
    localId = req.localId;
    mileage = req.actualMileage;
  }

  query = { localId:localId };

  return new Promise((resolve, reject)=>{
    MileageSnapshot.findOne(query).sort({'createdAt':-1}).exec()
      .then(function(res){
        if (res) {
          let today = moment(new Date()),
              lastUpdateMileage = moment(res.createdAt);

          // 2. Cantidad de dias entre la fecha del snapshot anterior y la de hoy
          let diffDays = today.diff(lastUpdateMileage, 'days');

          // 3. Diferencia de los kilometrajes del snapshot anterior y el actual
          let deffMileage = mileage - res.actualMileage ;

          // 4. Dividir punto 3 entre punto 2, para obtener el kilometraje promedio por dia
          if (diffDays === 0)
            diffDays = 1;

          let averageMileageDay = parseInt(Number(deffMileage/diffDays));

          resolve({
            averageMileageDay: averageMileageDay,
            previousMileage: res.actualMileage,
            daysSinceLastUpdate: diffDays
          });

        } else {
          console.log('Retorna Null');
          resolve(null);
        }

      })
      .catch(function(res){
        console.log('Res', res);
        reject(res);
      })
  });

}
