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

const office = {
  type: 'federal',
  name: 'admin',
  ageLimit: 50,
};

const party = {
  name: 'testparty',
  hqAddress: 'folawiyo bankole street',
  logoUrl: 'www.testurl.com',
};

before((done) => {
  chai.request(server)
    .post('/api/v1/auth/login')
    .send(userAdmin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      // uID = req.params.id;
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

before((done) => {
  chai.request(server)
    .post('/api/v1/parties')
    .send(party)
    .set('x-access-token', adminToken)
    .end(() => {
      done();
    });
});

const regCan = {
  office: 2,
  party: 3,
  ageLimit: 50,
};
before((done) => {
  chai.request(server)
    .post('/api/v1/office/3/register')
    .send(regCan)
    .set('x-access-token', adminToken)
    .end(() => {
      done();
    });
});


describe('/Post vote for choice candidate', () => {
  const office2 = {
    office: 1,
    candidate: 1,
  };

  it('it should post a vote for a candidate', (done) => {
    chai.request(server)
      .post('/api/v1/votes')
      .send(office2)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        res.body.data.should.have.include.key('office');
        res.body.data.should.have.include.key('candidate');
        done();
      });
  });

  it('it should Not post a vote for a candidate twice', (done) => {
    chai.request(server)
      .post('/api/v1/votes')
      .send(office2)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });
});
