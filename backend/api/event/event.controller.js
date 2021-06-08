const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const socketService = require('../../services/socket.service');
const eventService = require('./event.service');

async function getEvents(req, res) {
  try {
    const events = await eventService.query(req.query);
    res.send(events);
  } catch (err) {
    console.log('Cannot get events', err);
    res.status(500).send({ err: 'Failed to get events' });
  }
}

async function getEvent(req, res) {
  try {
    const event = await eventService.getById(req.params.id);
    console.log(event);

    res.send(event);
  } catch (err) {
    logger.error('Failed to get event', err);
    res.status(500).send({ err: 'Failed to get event' });
  }
}

async function deleteEvent(req, res) {
  try {
    await eventService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    // logger.error('Failed to delete event', err);
    res.status(500).send({ err: 'Failed to delete event' });
  }
}

async function updateEvent(req, res) {
  try {
    const event = req.body;
    savedEvent = await eventService.save(event);
    res.send(savedEvent);
  } catch (err) {
    console.log(err);
    logger.error('Failed to update event', err);
    res.status(500).send({ err: 'Failed to update event' });
  }
}

async function addEvent(req, res) {
  try {
    var event = req.body;
    // event.byUserId = req.session.user._id;
    event = await eventService.save(event);

    // prepare the updated event for sending out
    // event.byUser = await userService.getById(event.byUserId);
    // event.aboutUser = await userService.getById(event.aboutUserId);

    // console.log('CTRL SessionId:', req.sessionID);
    // socketService.broadcast({ type: 'review-added', data: review });
    // socketService.emitToAll({
    //   type: 'user-updated',
    //   data: review.byUser,
    //   room: req.session.user._id,
    // });
    res.send(event);
  } catch (err) {
    console.log(err);
    logger.error('Failed to add review', err);
    res.status(500).send({ err: 'Failed to add review' });
  }
}

module.exports = {
  getEvents,
  deleteEvent,
  addEvent,
  updateEvent,
  getEvent,
};
