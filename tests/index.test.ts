import app from '../src/index';
import request from 'supertest';

describe('app', () => {
    it('should return a successful response for GET /', done => {
        request(app).get('/')
            .expect(200, done);
    });
});
