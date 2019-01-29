/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);


describe('/Post create political office', () => {
  const office = {
    type: 'federal',
    name: 'presidency',
    ageLimit: '50',
  };
  const noOfficeType = {
    name: 'presidency',
    ageLimit: '50',
  };
  const noOfficeName = {
    type: 'federal',
    ageLimit: '50',
  };
  const noOfficeAge = {
    type: 'federal',
    name: 'presidency',
  };

  const emptyType = {
    type: '   ',
    name: 'presidency',
    ageLimit: '50',
  };
  const emptyofficeName = {
    type: 'legislative',
    name: '    ',
    ageLimit: '50',
  };
  const emptyAge = {
    type: 'state',
    name: 'governor',
    ageLimit: '     ',
  };
  const invalidType = {
    type: 'ioejbermob',
    name: 'presidency',
    ageLimit: '50',
  };
  const invalidAge = {
    type: '   ',
    name: 'presidency',
    ageLimit: '10',
  };
  const invalidAgeType = {
    type: 'local government',
    name: 'councellor',
    ageLimit: 'xx',
  };
  it('it should Create a new office with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new office with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office)
      .end((err, res) => {
        res.body.data[0].should.have.include.key('type');
        res.body.data[0].should.have.include.key('name');
        res.body.data[0].should.have.include.key('ageLimit');
        done();
      });
  });

  it('it should not Create a new office without type', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeType)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new office without ageLimit', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeAge)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new office without office name', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(noOfficeName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party office name field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyofficeName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should throw a 406 when there are spaces in the office type field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyType)
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('it should throw a 406 when there are spaces in the office ageLimit field', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(emptyAge)
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('it should throw a 406 when creating a party with invalid type', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidType)
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('it should throw a 400 when creating a party with wrong ageLimit value < 30', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidAge)
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('it should throw a 406 when the ageLimit value isNan', (done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(invalidAgeType)
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });
});

describe('GET /offices', () => {
  it('should get all existing offices', (done) => {
    chai.request(server)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


describe('GET /offices/:id', () => {
  const office2 = {
    type: 'federal',
    name: 'presidency',
    ageLimit: '50',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/offices')
      .send(office2)
      .end(() => {
        done();
      });
  });
  it('should get the matching office', (done) => {
    chai.request(server)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 406 on nan ids', (done) => {
    chai.request(server)
      .get('/api/v1/offices/sv')
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('should return 404 when id is not found', (done) => {
    chai.request(server)
      .get('/api/v1/offices/10')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
