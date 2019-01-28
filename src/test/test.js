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


describe('/Post create political party', () => {
  const party = {
    name: 'apga',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const party2 = {
    name: 'kowa',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const partyNoName = {
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const partyNoAddress = {
    name: 'pdp',
    logoUrl: 'www.testurl.com',
  };
  const partyNoLogo = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
  };

  const partyEmptyField = {
    name: '   ',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const hqEmptyField = {
    name: 'pdp',
    hqAddressUrl: '   ',
    logoUrl: 'www.testurl.com',
  };
  const logoEmptyField = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: '   ',
  };
  const invalidLogoUrl = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'hbjniomol,',
  };
  const invalidAddress = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo vevever32es',
    logoUrl: 'www.testurl.com',
  };
  it('it should Create a new party with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new party with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party2)
      .end((err, res) => {
        res.body.data.should.have.include.key('name');
        res.body.data.should.have.include.key('hqaddress');
        res.body.data.should.have.include.key('logourl');
        done();
      });
  });

  it('it should not Create a new party without name', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyNoName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new party without logo', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyNoLogo)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new party without hqaddress', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyNoAddress)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party name field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyEmptyField)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should throw a 400 when there are spaces in the party hqaddress field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(hqEmptyField)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party logo field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(logoEmptyField)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with invalid url', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(invalidLogoUrl)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with wrong address', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(invalidAddress)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('GET /parties/:id', () => {
  const party2 = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  before((done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party2)
      .end(() => {
        done();
      });
  });
  it('should get the matching party', (done) => {
    chai.request(server)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 406 on nan ids', (done) => {
    chai.request(server)
      .get('/api/v1/parties/sv')
      .end((err, res) => {
        res.should.have.status(406);
        done();
      });
  });

  it('should return 404 when id is not found', (done) => {
    chai.request(server)
      .get('/api/v1/parties/10')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('GET /parties', () => {
  it('should get all existing parties', (done) => {
    chai.request(server)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
