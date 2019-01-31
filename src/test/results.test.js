/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);
let adminToken;

const userAdmin = {
  email: 'example@yahoo.com',
  password: '2020ada',
};

before((done) => {
  chai.request(server)
    .post('/api/v1/auth/login')
    .send(userAdmin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

describe('/POST returns results of election', () => {
  it('it should get a particular office election result', (done) => {
    chai.request(server)
      .post('/api/v1/office/1/result')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.status.should.be.equal(200);
        done();
      });
  });

  it('it should throw an error when the request id is not a number', (done) => {
    chai.request(server)
      .post('/api/v1/office/xyz/result')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should Not return any result when the candidate id does not exist', (done) => {
    chai.request(server)
      .post('/api/v1/office/100/result')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
