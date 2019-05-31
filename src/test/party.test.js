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
  email: 'preshxxx@gmail.com',
  password: '2020ada',
  type: 'citizen',
  phonenumber: '+234-7032425462',
  username: 'prehxxxxxx',
};
const user1 = {
  email: 'preshxxx@gmail.com',
  password: '2020ada',
};
const userAdmin = {
  email: 'example@yahoo.com',
  password: '2020ada',
};
const party2 = {
  name: 'pdpzz',
  hqAddress: 'folawiyo bankole street',
  logoUrl: 'www.testurl.com',
};
const party4 = {
  name: 'pdpzzv',
  hqAddress: 'folawiyo bankole street',
  logoUrl: 'www.testurl.com',
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

before((done) => {
  chai.request(server)
    .post('/api/v1/parties')
    .set('x-access-token', adminToken)
    .send(party2)
    .end((err, res) => {
      idD = res.body.data.id;
      done();
    });
});

describe('/Post create political party', () => {
  const party = {
    name: 'apga',
    hqAddress: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const partyNoName = {
    hqAddress: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const partyNoAddress = {
    name: 'pdp',
    logoUrl: 'www.testurl.com',
  };
  const partyNoLogo = {
    name: 'pdp',
    hqAddress: 'folawiyo bankole street',
  };

  const partyEmptyField = {
    name: '   ',
    hqAddress: 'folawiyo bankole street',
    logoUrl: 'www.testurl.com',
  };
  const hqEmptyField = {
    name: 'pdp',
    hqAddress: '   ',
    logoUrl: 'www.testurl.com',
  };
  const logoEmptyField = {
    name: 'pdp',
    hqAddress: 'folawiyo bankole street',
    logoUrl: '   ',
  };
  const invalidLogoUrl = {
    name: 'pdp',
    hqAddress: 'folawiyo bankole street',
    logoUrl: 'hbjniomol,',
  };
  const invalidAddress = {
    name: 'pdp',
    hqAddress: 'folawiyo vevever32es',
    logoUrl: 'www.testurl.com',
  };
  it('it should Create a new party with correct status code', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.status.should.be.equal(201);
        done();
      });
  });

  it('it should Create a new party with required fields', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(party4)
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new party without logo', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyNoLogo)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should not Create a new party without hqaddress', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyNoAddress)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party name field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(partyEmptyField)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
  it('it should throw a 400 when there are spaces in the party hqaddress field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(hqEmptyField)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when there are spaces in the party logo field', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(logoEmptyField)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with invalid url', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(invalidLogoUrl)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should throw a 400 when creating a party with wrong address', (done) => {
    chai.request(server)
      .post('/api/v1/parties')
      .send(invalidAddress)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe('GET /parties/:id', () => {
  it('should get the matching party', (done) => {
    chai.request(server)
      .get(`/api/v1/parties/${idD}`)
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return 400 on nan ids', (done) => {
    chai.request(server)
      .get('/api/v1/parties/sv')
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return 404 when id is not found', (done) => {
    chai.request(server)
      .get('/api/v1/parties/10')
      .set('x-access-token', tokenUser)
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
      .set('x-access-token', tokenUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/patch Update party name', () => {
  const party3 = {
    name: 'pdpupdatex',
  };

  const party4 = {
    name: 'pdpupdatefffx',
  };
  const party3Spaces = {
    name: '     ',
  };
  const party3NoName = {};

  it('should return a success status 200', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('should return a success status 409 when party name already exists', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(409);
        done();
      });
  });

  it('should return an error 404 if party id is not found', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/42/name')
      .send(party4)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('should return correct error message when id is not valid', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/ercf/name')
      .send(party3)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          error: {
            message: 'The id parameter must be a number',
          },
        });
        done();
      });
  });

  it('should not create party when name is missing', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3NoName)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          error: {
            message: 'Party name is required',
          },
        });
        done();
      });
  });

  it('should not update party when name field has only whitespaces', (done) => {
    chai.request(server)
      .patch('/api/v1/parties/1/name')
      .send(party3Spaces)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          error: {
            message: 'Name Field should contain actual characters and not only spaces',
          },
        });
        done();
      });
  });
});

describe('DELETE a party', () => {
  it('should return a success status 200', (done) => {
    chai.request(server)
      .delete(`/api/v1/parties/${idD}`)
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.deep.equal({
          status: 200,
          message: 'party has been deleted',
        });
        done();
      });
  });

  it('should return correct error message when id does not exist', (done) => {
    chai.request(server)
      .delete('/api/v1/parties/25')
      .set('x-access-token', adminToken)
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
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.body.should.be.deep.equal({
          status: 400,
          error: {
            message: 'The id parameter must be a number',
          },
        });
        done();
      });
  });
});
