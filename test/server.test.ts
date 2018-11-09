import * as request from 'supertest';
import server from '../src/server';

describe('GET not found', () => {
  it('should return 404', done => {
    request(server).get('/reset')
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('should return 200', done => {
    request(server).get('/')
      .expect(200, done);
  });
});

describe('GET /foo', () => {
  it('should return JSON', done => {
    request(server).get('/foo')
      .expect('Content-Type', /json/)
      .expect(200, {bar: 'baz'}, done);
  });
});

afterAll(done => {
  server.close(done);
});
