const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterBy = {}) {
  try {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('eventi');
    const events = await collection.find().toArray();
    return events;
  } catch (err) {
    console.log('cannot find events', err);
    throw err;
  }
}

async function getById(eventId) {
  try {
    const collection = await dbService.getCollection('eventi');
    let event = await collection.findOne({ _id: ObjectId(eventId) });
    if (event === null) event = collection.findOne({ _id: eventId });
    console.log(event);
    return event;
  } catch (err) {
    logger.error(`while finding event ${eventId}`, err);
    throw err;
  }
}

async function remove(eventId) {
  try {
    const collection = await dbService.getCollection('eventi');
    await collection.deleteOne({ _id: ObjectId(eventId) });
  } catch (err) {
    console.log(`cannot remove event ${eventId}`, err);
    throw err;
  }
}

async function save(event) {
  const { inStock, type, price, name } = event;
  let savedEvent;
  if (event._id) {
    // db.customer.updateOne({ "_id": ObjectId("579c6ecab87b4b49be12664c") }, { $set: { balance: 20 } }
    //UPDATE
    try {
      savedEvent = {
        ...event,
        _id: ObjectId(event._id),
        updatedAt: Date.now(),
      };
      //   savedEvent = {
      //     _id: ObjectId(event._id),
      //     name,
      //     type,
      //     price,
      //     inStock,
      //   };
      const collection = await dbService.getCollection('eventi');
      await collection.updateOne({ _id: savedEvent._id }, { $set: savedEvent });
      return savedEvent;
    } catch (err) {
      logger.error('cannot update event', err);
      throw err;
    }
  } else {
    // CREATE
    try {
      savedEvent = { ...event };
      savedEvent.createdAt = Date.now();
      const collection = await dbService.getCollection('eventi');
      await collection.insertOne(savedEvent);
      return savedEvent;
    } catch (err) {
      logger.error('cannot add event', err);
      throw err;
    }
  }
}

// async function add(event) {
//   console.log(event, 'add toy');
//   try {
//     // peek only updatable fields!
//     // const eventToAdd = {
//     //   name: toy.name,
//     //   type: toy.type,
//     //   inStock: toy.inStock,
//     //   price: toy.price,
//     //   createdAt: Date.now(),
//     // };
//     const collection = await dbService.getCollection('eventi');
//     await collection.insertOne(event);
//     return event;
//   } catch (err) {
//     logger.error('cannot insert event', err);
//     throw err;
//   }
// }

async function getById(eventId) {
  try {
    const collection = await dbService.getCollection('eventi');
    const event = await collection.findOne({ _id: ObjectId(eventId) });
    return event;
  } catch (err) {
    logger.error(`while finding event ${eventId}`, err);
    throw err;
  }
}
function _buildCriteria(filterBy) {
  const criteria = {};
  return criteria;
}

module.exports = {
  query,
  remove,
  save,
  getById,
  //   updateEvent,
};

// async function remove(toyId) {
//   try {
//     const collection = await dbService.getCollection('toy');
//     // remove only if user is owner/admin
//     await collection.deleteOne({ _id: ObjectId(toyId) });
//   } catch (err) {
//     logger.error(`cannot remove review ${reviewId}`, err);
//     throw err;
//   }
// }

// async function add(event) {
//   try {
//     // peek only updatable fields!
//     const eventToAdd = {
//       _id: ObjectId(event._id),
//       //   aboutUserId: ObjectId(review.aboutUserId),
//       txt: review.txt,
//     };
//     const collection = await dbService.getCollection('review');
//     await collection.insertOne(reviewToAdd);
//     return reviewToAdd;
//   } catch (err) {
//     logger.error('cannot insert review', err);
//     throw err;
//   }
// }
// async function query(filterBy = {}) {
//   try {
//     // const criteria = _buildCriteria(filterBy)
//     const collection = await dbService.getCollection('eventi');
//     // const reviews = await collection.find(criteria).toArray()
//     var events = await collection
//       .aggregate([
//         {
//           $match: filterBy,
//         },
//         {
//           $lookup: {
//             localField: 'byUserId',
//             from: 'user',
//             foreignField: '_id',
//             as: 'byUser',
//           },
//         },
//         {
//           $unwind: '$byUser',
//         },
//         {
//           $lookup: {
//             localField: 'aboutUserId',
//             from: 'user',
//             foreignField: '_id',
//             as: 'aboutUser',
//           },
//         },
//         {
//           $unwind: '$aboutUser',
//         },
//       ])
//       .toArray();
//     reviews = reviews.map((review) => {
//       review.byUser = {
//         _id: review.byUser._id,
//         fullname: review.byUser.fullname,
//       };
//       review.aboutUser = {
//         _id: review.aboutUser._id,
//         fullname: review.aboutUser.fullname,
//       };
//       delete review.byUserId;
//       delete review.aboutUserId;
//       return review;
//     });
//     return reviews;
//   } catch (err) {
//     logger.error('cannot find reviews', err);
//     throw err;
//   }
// }

// async function remove(eventId) {
//   try {
//     const store = asyncLocalStorage.getStore();
//     // const { userId, isAdmin } = store;
//     const collection = await dbService.getCollection('eventi');
//     // remove only if user is owner/admin
//     const query = { _id: ObjectId(eventId) };
//     if (!isAdmin) query.byUserId = ObjectId(userId);
//     await collection.deleteOne(query);
//     // return await collection.deleteOne({ _id: ObjectId(reviewId), byUserId: ObjectId(userId) })
//   } catch (err) {
//     logger.error(`cannot remove review ${reviewId}`, err);
//     throw err;
//   }
// }
