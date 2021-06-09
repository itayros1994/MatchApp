import events from '../data/eventi.json';
import users from '../data/user.json';

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  queryLocations,
};
loadData();
function loadData() {
  console.log('1');
  var eventsDB = JSON.parse(localStorage.getItem('event')) || [];
  var usersDB = JSON.parse(localStorage.getItem('user')) || [];
  var eventLocations = events.eventi.map((event) => {
    return event.location;
  });
  // console.log(eventLocations);
  if (!eventsDB.length) eventsDB = events.eventi;
  if (!usersDB.events) usersDB = users.user;
  // console.log(usersDB, eventsDB);
  _save('event', eventsDB);
  _save('user', usersDB);
  _save('loc', eventLocations);
}

function query(entityType, filterBy) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];
  // console.log(entities);
  entities = filterEvents(entities, filterBy);
  // console.log(entities);
  return Promise.resolve(entities);
}

function filterEvents(events, filterBy) {
  console.log(events);
  if (!filterBy) return events;
  var { type, location, date, time } = filterBy;
  if (type === 'all') type = '';
  if (location === 'all') location = '';
  let filteredEvents = events.filter((event) => {
    return (
      event.type.includes(type) &&
      event.location.includes(location) &&
      event.eventDate.includes(date) &&
      event.eventTime.includes(time)
    );
  });
  return filteredEvents;
}

function get(entityType, entityId) {
  return query(entityType).then((entities) =>
    entities.find((entity) => entity._id === entityId)
  );
}
function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function queryLocations() {
  const locations = JSON.parse(localStorage.getItem('loc'));
  // console.log(locations);
  return locations;
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
// remove1();
// function remove1() {
//   return query('event').then((entities) => {
//     const idx = entities.findIndex((entity) => entity._id === '49wVQ');
//     entities.splice(idx, 1);
//     _save('event', entities);
//   });
// }
