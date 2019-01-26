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
    name: 'pdp',
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
      .send(party)
      .end((err, res) => {
        res.body.data[0].should.have.include.key('name');
        res.body.data[0].should.have.include.key('hqAddressUrl');
        res.body.data[0].should.have.include.key('logoUrl');
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


describe('/patch Update party name', () => {
  const party3 = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };

  const party3Spaces = {
    name: '     ',
  };
  const party3NoName = {};

  it('should return a success status 200', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return an error 404 if record not found', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/42/name')
      .send(party3)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message when id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/41/name')
      .send(party3)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 404,
          error: 'party not found, enter a valid id',
        });
        done();
      });
  });

  it('should return correct error message when id is not valid', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/ercf/name')
      .send(party3)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 406,
          error: 'The id parameter must be a number',
        });
        done();
      });
  });

  it('should not create party when name is missing', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3NoName)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          message: 'Party name is required',
        });
        done();
      });
  });

  it('should not update party when name field has only whitespaces', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3Spaces)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          error: 'Field should contain actual characters and not only spaces',
        });
        done();
      });
  });
});


describe('DELETE a party', () => {
  const party4 = {
    name: 'pdp',
    hqAddressUrl: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  beforeEach((done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party4)
      .end(() => {
        done();
      });
  });
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.deep.equal({
          status: 200,
          data: [{
            id: '1',
            message: 'party has been deleted',
          }],
        });
        done();
      });
  });

  it('should return correct error message when id does not exist', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/25')
      .end((err, res) => {
        res.body.should.deep.equal({
          status: 404,
          error: 'party not found, enter a valid id',
        });
        done();
      });
  });

  it('should return correct error message when id is not valid', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/ercf')
      .send(party4)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 406,
          error: 'The id parameter must be a number',
        });
        done();
      });
  });
});
