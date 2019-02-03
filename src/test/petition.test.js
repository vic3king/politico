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
  type: 'legislative',
  name: 'councelor',
  ageLimit: '50',
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
  const petition = {
    office: 2,
    comment: 'petition against the result of the concluded election',
  };

  const petitionBadOffice = {
    office: '200',
    comment: 'petition against the result of the concluded election',
  };

  const petitionOfficeNotFound = {
    office: 200,
    comment: 'petition against the result of the concluded election',
  };

  const petitionBadComment = {
    office: 1,
    comment: 2,
  };

  const petitionNooffice = {
    comment: 'petition against the result of the concluded election',
  };

  const petitionNocomment = {
    office: 2,
  };

  it('it should raise a petttition with correct status and fields', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petition)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        res.body.data.should.have.include.key('comment');
        res.body.data.should.have.include.key('office');
        done();
      });
  });

  it('it should not raise a petition twice for one office with one user', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petition)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('it should not raise a petition when there is no token', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petition)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it('it should not raise a petition when comment type is bad', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petitionBadComment)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not raise a petition when office type is bad', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petitionBadOffice)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not raise a petition when there is no office', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petitionNooffice)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not raise a petition when there is no comment', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petitionNocomment)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not raise a petition when office is not found', (done) => {
    chai.request(server)
      .post('/api/v1/petitions')
      .send(petitionOfficeNotFound)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
