'use strict'
const test = require('tape')
const pino = require('../browser')

Date.now = () => 1599400603614

test('prints null timestamp', ({ end, is }) => {
  const instance = pino({
    timestamp: pino.stdTimeFunctions.nullTime,
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, undefined)
      }
    }
  })
  instance.info('hello world')
  end()
})

test('prints iso timestamp', ({ end, is }) => {
  const instance = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, '2020-09-06T13:56:43.614Z')
      }
    }
  })
  instance.info('hello world')
  end()
})

test('prints epoch timestamp', ({ end, is }) => {
  const instance = pino({
    timestamp: pino.stdTimeFunctions.epochTime,
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, 1599400603614)
      }
    }
  })
  instance.info('hello world')
  end()
})

test('prints unix timestamp', ({ end, is }) => {
  const instance = pino({
    timestamp: pino.stdTimeFunctions.unixTime,
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, Math.round(1599400603614 / 1000.0))
      }
    }
  })
  instance.info('hello world')
  end()
})

test('prints epoch timestamp by default', ({ end, is }) => {
  const instance = pino({
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, 1599400603614)
      }
    }
  })
  instance.info('hello world')
  end()
})

test('prints epoch timestamp by default', ({ end, is }) => {
  const instance = pino({
    timestamp: false,
    browser: {
      asObject: true,
      write: function (o) {
        is(o.time, undefined)
      }
    }
  })
  instance.info('hello world')
  end()
})
