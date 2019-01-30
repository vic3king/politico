/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);
let adminToken;
let uID;

const userAdmin = {
  email: 'example@yahoo.com',
  password: '2020ada',
};

const office = {
  type: 'federal',
  name: 'vicep',
  ageLimit: '50',
};

const party = {
  name: 'pdpzzwref',
  hqAddress: 'folawiyo bankole street',
  logoUrl: 'www.testurl.com',
};

before((done) => {
  chai.request(server)
    .post('/api/v1/auth/login')
    .send(userAdmin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      uID = res.body.data[0].user.id;
      done();
    });
});

before((done) => {
  chai.request(server)
    .post('/api/v1/parties')
    .send(party)
    .set('x-access-token', adminToken)
    .end(() => {
      done();
    });
});
before((done) => {
  chai.request(server)
    .post('/api/v1/offices')
    .send(office)
    .set('x-access-token', adminToken)
    .end(() => {
      done();
    });
});

describe('/Post create candidate', () => {
  const office2 = {
    office: '1',
    party: '1',
    ageLimit: '50',
  };

  it('it should Create a new candidate with correct status code', (done) => {
    chai.request(server)
      .post(`/api/v1/office/${uID}/register`)
      .send(office2)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        res.body.data.should.have.include.key('party');
        res.body.data.should.have.include.key('office');
        res.body.data.should.have.include.key('agelimit');
        done();
      });
  });
});
