/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);

describe('UI routes', () => {
  it('should send success at /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should throw a 404 when request is made to wrong url', (done) => {
    chai.request(server)
      .get('/UI')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should throw a 400 for other methods on /', (done) => {
    chai.request(server)
      .post('/')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
