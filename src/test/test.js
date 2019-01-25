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
});
