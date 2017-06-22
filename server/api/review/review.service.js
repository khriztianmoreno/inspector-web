'use strict';

const _ = require('lodash');
const moment = require("moment");
const decodedToken = require('./../../auth/auth.service').decodedToken;

export function generalDashboard(req) {
  let user = currentUserFromToken(req),
    today = moment().startOf('day'),
    tomorrow = moment(today).add(1, 'days'),
    d = new Date(),
    monthQuery = d.getMonth() + 1;

  let day = {
    today: today,
    tomorrow: tomorrow
  };

  let query = {
    costMonthly: GENERAL_BOARD_COST_REVIEWS_MONTHLY[user.role](user),
    costToday: GENERAL_BOARD_COST_REVIEWS_TODAY[user.role](user, day),
    countMonthly: GENERAL_BOARD_COUNT_REVIEWS_MONTHLY[user.role](user),
    countToday: GENERAL_BOARD_COUNT_REVIEWS_TODAY[user.role](user, day)
  };
  return query;
}

export function myReviews(req) {
  let user = currentUserFromToken(req);
  const QUERY = {
    'admin': function() {
      return {};
    },
    'cda': function(currentUser) {
      return {
        'customer.channelId': currentUser.customer.channelId
      };
    },
    'sede': function(currentUser) {
      return {
        'customer.distributorId': currentUser.customer.distributorId
      };
    },
    tecnico: function (currentUser) {
      return {
        'userReview.localId': currentUser._id,
      }
    },
    'flota': function(currentUser) {
      return {
        'customer.localId': currentUser.customer.localId
      };
    },
  };

  return QUERY[user.role](user) || {
    type: 'undefined'
  };
}

export function totalReviewsByDays(req) {
  let user = currentUserFromToken(req);

  const QUERY = {
    'admin': function() {
      return [{
        $group: {
          _id: {
            $add: [{
              $dayOfYear: "$createdAt"
            }, {
              $multiply: [400, {
                $year: "$createdAt"
              }]
            }]
          },
          reviews: {
            $sum: 1
          },
          first: {
            $min: "$createdAt"
          }
        }
      }, {
        $sort: {
          _id: 1
        }
      }, {
        $limit: 15
      }, {
        $project: {
          date: "$first",
          reviews: 1,
          _id: 0
        }
      }];
    },
    'cda': function(customer) {
      return [{
        $match: {
          'customer.channelId': customer.localId
        }
      }, {
        $group: {
          _id: {
            $add: [{
              $dayOfYear: "$createdAt"
            }, {
              $multiply: [400, {
                $year: "$createdAt"
              }]
            }]
          },
          reviews: {
            $sum: 1
          },
          first: {
            $min: "$createdAt"
          }
        }
      }, {
        $sort: {
          _id: 1
        }
      }, {
        $limit: 15
      }, {
        $project: {
          date: "$first",
          reviews: 1,
          _id: 0
        }
      }];
    },
    'sede': function(customer) {
      return [{
        $match: {
          'customer.distributorId': customer.localId
        }
      }, {
        $group: {
          _id: {
            $add: [{
              $dayOfYear: "$createdAt"
            }, {
              $multiply: [400, {
                $year: "$createdAt"
              }]
            }]
          },
          reviews: {
            $sum: 1
          },
          first: {
            $min: "$createdAt"
          }
        }
      }, {
        $sort: {
          _id: 1
        }
      }, {
        $limit: 15
      }, {
        $project: {
          date: "$first",
          reviews: 1,
          _id: 0
        }
      }];
    },
    'flota': function(customer) {
      return [{
        $match: {
          'customer.localId': customer.localId
        }
      }, {
        $group: {
          _id: {
            $add: [{
              $dayOfYear: "$createdAt"
            }, {
              $multiply: [400, {
                $year: "$createdAt"
              }]
            }]
          },
          reviews: {
            $sum: 1
          },
          first: {
            $min: "$createdAt"
          }
        }
      }, {
        $sort: {
          _id: 1
        }
      }, {
        $limit: 15
      }, {
        $project: {
          date: "$first",
          reviews: 1,
          _id: 0
        }
      }];
    },
    'tecnico': function(){
      return [{ $project: { 'createdAt': 1} }];
    }
  };

  return QUERY[user.role](user.customer) || {};
}

export function reportQuery(req) {
  let startDate = req.body.startDate,
    endDate = req.body.endDate,
    fleet = req.body.fleet,
    plate = req.body.plate,
    technical = req.body.technical;

  let query = {};

  if (startDate && endDate) {
    query['createdAt'] = {
      $gte: startDate,
      $lte: endDate
    };
  }

  if (fleet) {
    query['customer.localId'] = fleet;
  }

  if (technical) {
    query['userReview.localId'] = technical
  }

  if (plate) {
    query['vehicle.plate'] = {
      $regex: plate,
      $options: 'i'
    };
  }

  console.log(query);
  return query;
}

/**
 * Get user from token
 */
function currentUserFromToken(req) {
  return decodedToken(req.headers.authorization.split('Bearer ')[1]);
}

const GENERAL_BOARD_COUNT_REVIEWS_MONTHLY = {
  'admin': function() {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        reviews: {
          $sum: 1
        }
      }
    }];
  },
  'cda': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        'customer.channelId': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.channelId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        reviews: {
          $sum: 1
        }
      }
    }];
  },
  'sede': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.distributorName': 1,
        'customer.distributorId': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.distributorId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.distributorName'
        },
        reviews: {
          $sum: 1
        }
      }
    }];
    return {
      "customer.distributorId": user.customer.localId
    };
  },
  'flota': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.localName': 1,
        'customer.localId': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.localId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.localName'
        },
        reviews: {
          $sum: 1
        }
      }
    }];
  },
  'tecnico': function() {
    return [{$project: { 'customer.channelName': 1}}];
  }
};

const GENERAL_BOARD_COUNT_REVIEWS_TODAY = {
  'admin': function(user, day) {
    return {
      'createdAt': {
        $gte: day.today.toDate(),
        $lt: day.tomorrow.toDate()
      }
    }
  },
  'cda': function(user, day) {
    return {
      'customer.channelId': user.customer.localId,
      'createdAt': {
        $gte: day.today.toDate(),
        $lt: day.tomorrow.toDate()
      }
    }
  },
  'sede': function(user, day) {
    return {
      'customer.distributorId': user.customer.localId,
      'createdAt': {
        $gte: day.today.toDate(),
        $lt: day.tomorrow.toDate()
      }
    }
  },
  'flota': function(user, day) {
    return {
      'customer.localId': user.customer.localId,
      'createdAt': {
        $gte: day.today.toDate(),
        $lt: day.tomorrow.toDate()
      }
    }
  },
  'tecnico': function() {
    return {};
  }
};

const GENERAL_BOARD_COST_REVIEWS_MONTHLY = {
  'admin': function() {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        'cost': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'cda': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        'customer.channelId': 1,
        'cost': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.channelId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'sede': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.distributorName': 1,
        'customer.distributorId': 1,
        'cost': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.distributorId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.distributorName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'flota': function(user) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.localName': 1,
        'customer.localId': 1,
        'cost': 1,
        month: {
          $month: '$createdAt'
        }
      }
    }, {
      $match: {
        'customer.localId': user.customer.localId,
        'month': monthQuery
      }
    }, {
      $group: {
        _id: {
          client: '$customer.localName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'tecnico': function() {
    return [{
      $project: { 'cost': 1}
    }];
  }
};

const GENERAL_BOARD_COST_REVIEWS_TODAY = {
  'admin': function(user, day) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        'cost': 1,
        'createdAt': 1
      }
    }, {
      $match: {
        'createdAt': {
          $gte: day.today.toDate(),
          $lt: day.tomorrow.toDate()
        }
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'cda': function(user, day) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.channelName': 1,
        'customer.channelId': 1,
        'cost': 1,
        'createdAt': 1
      }
    }, {
      $match: {
        'customer.channelId': user.customer.localId,
        'createdAt': {
          $gte: day.today.toDate(),
          $lt: day.tomorrow.toDate()
        }
      }
    }, {
      $group: {
        _id: {
          client: '$customer.channelName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'sede': function(user, day) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.distributorName': 1,
        'customer.distributorId': 1,
        'cost': 1,
        'createdAt': 1
      }
    }, {
      $match: {
        'customer.distributorId': user.customer.localId,
        'createdAt': {
          $gte: day.today.toDate(),
          $lt: day.tomorrow.toDate()
        }
      }
    }, {
      $group: {
        _id: {
          client: '$customer.distributorName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'flota': function(user, day) {
    let d = new Date(),
      monthQuery = d.getMonth() + 1;
    return [{
      $project: {
        'customer.localName': 1,
        'customer.localId': 1,
        'cost': 1,
        'createdAt': 1
      }
    }, {
      $match: {
        'customer.localId': user.customer.localId,
        'createdAt': {
          $gte: day.today.toDate(),
          $lt: day.tomorrow.toDate()
        }
      }
    }, {
      $group: {
        _id: {
          client: '$customer.localName'
        },
        value: {
          $sum: '$cost'
        }
      }
    }];
  },
  'tecnico': function() {
    return [{
      $project: {
        'customer.channelName': 1,
        'cost': 1,
        'createdAt': 1
      }
    }];
  }
};
