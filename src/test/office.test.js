/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);
let tokenUser;
let adminToken;
let idD;

const user = {
  firstname: 'akaniru',
  lastname: 'precious',
  othernames: 'presh',
  email: 'preshxx@gmail.com',
  password: '2020ada',
  type: 'citizen',
  phonenumber: '07032421061',
  username: 'preshxxxxxx',
};
const user1 = {
  email: 'preshxx@gmail.com',
  password: '2020ada',
};
const userAdmin = {
  email: 'example@yahoo.com',
  password: '2020ada',
};
before((done) => {
  chai.request(server)
    .post('/api/v1/auth/signup')
    .send(user)
    .end(() => {
      done();
    });
});
before((done) => {
  chai.request(server)
    .post('/api/v1/auth/login')
    .send(user1)
    .end((err, res) => {
      tokenUser = res.body.data[0].token;
      done();
    });
});
before((done) => {
  chai.request(server)
    .post('/api/v1/auth/login')
    .send(userAdmin)
    .end((err, res) => {
      adminToken = res.body.data[0].token;
      done();
    });
});

describe('/Post create political office', () => {
  const office = {
    type: 'federal',
    name: 'vice',
    ageLimit: 50,
    description: 'rytcfuyvgbhjknml,;.',
  };

  const office1 = {
    type: 'federal',
    name: 'speaker',
    ageLimit: 50,
    description: 'rytcfuyvgbhjknml,;.',
  };

  const noOfficeType = {
    name: 'presidency',
    ageLimit: 50,
  };
  const noOfficeName = {
    type: 'federal',
    ageLimit: 50,
  };
  const noOfficeAge = {
    type: 'federal',
    name: 'presidency',
  };

  const emptyType = {
    type: '   ',
    name: 'vicepresident',
    ageLimit: 50,
  };
  const emptyofficeName = {
    type: 'legislative',
    name: '    ',
    ageLimit: 50,
  };
  const emptyAge = {
    type: 'state',
    name: 'governor',
    ageLimit: '     ',
  };
  const invalidType = {
    type: 'ioejbermob',
    name: 'cbngov',
    ageLimit: 50,
  };
  const invalidAge = {
    type: 'state',
    name: 'president',
    ageLimit: 10,
  };
  const invalidAgeType = {
    type: 'local government',
    name: 'councellor',
    ageLimit: 'xx',
    description: 'hbjknlm,.',
  };

  it('it should Create a new office with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        idD = res.body.data.id;
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new office with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office1)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.data.should.have.include.key('type');
        res.body.data.should.have.include.key('name');
        res.body.data.should.have.include.key('agelimit');
        done();
      });
  });

  it('it should not Create a new office without type', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeType)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new office without ageLimit', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeAge)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new office without office name', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeName)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party office name field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyofficeName)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should throw a 400 when there are spaces in the office type field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyType)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the office ageLimit field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyAge)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with invalid type', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidType)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with wrong ageLimit value < 30', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidAge)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when the ageLimit value isNan', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidAgeType)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('GET /offices/:id', () => {
  const office2 = {
    type: 'federal',
    name: 'presidency',
    ageLimit: 50,
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office2)
      .set('x-access-token', tokenUser)
      .end(() => {
        done();
      });
  });
  it('should get the matching office', (done) => {
    chai.request(server)
      .get(`/api/v1/offices/${idD}`)
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 400 on nan ids', (done) => {
    chai.request(server)
      .get('/api/v1/offices/sv')
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return 404 when id is not found', (done) => {
    chai.request(server)
      .get('/api/v1/offices/10')
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('GET /offices', () => {
  it('should get all existing offices', (done) => {
    chai.request(server)
      .get('/api/v1/offices')
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('GET /candidates/office', () => {
  it('should throw an error when office id is not a number', (done) => {
    chai.request(server)
      .get('/api/v1/candidates/x')
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should throw an error when no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/candidates/1')
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
