'use strict';

export const mongoConfig = {
  dev: {
    uri: 'mongodb://localhost/isomorphic-planning-poker'
  },
  test: {
    uri: 'mongodb://localhost/isomorphic-planning-poker-test'
  },
  options: {
    db: {
      safe: true
    }
  }
};
