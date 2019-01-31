/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

chai.should();
chai.use(chaiHttp);

describe('CREATE a user', () => {
  const user = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoEmail = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    password: '2020ada',
    type: 'politician',
    phonenumber: '+234-7032425466',
    username: 'preshx',
  };
  const userNoPassword = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'preshxx@gmail.com',
    phonenumber: '+234-7032425469',
    type: 'citizen',
    username: 'preshxx',
  };

  const userNoFirstname = {
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };

  const userNoLastName = {
    firstname: 'akaniru',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoType = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoPhn = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    username: 'presh',
  };

  const userNoOtherName = {
    firstname: 'akaniru',
    lastname: 'precious',
    email: 'presh@gmail.com',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    password: '2020ada',
    username: 'presh',
  };

  const userBadEmail = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'preshxxgmail.com',
    phonenumber: '+234-7032125466',
    password: '2020ada',
    username: 'preshwx',
  };

  const userBadType = {
    firstname: 'akas',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmaisl.com',
    password: '2020ada',
    type: 'cbeberbe',
    phonenumber: '+234-7032125460',
    username: 'preshs',
  };

  const userNoFirstnameSpace = {
    firstname: '      ',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoLastNameSpace = {
    firstname: 'akaniru',
    lastname: '      ',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoOtherNameSpace = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: '    ',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoEmailSpace = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: '     ',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  const userNoPhnSpace = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '       ',
    username: 'presh',
  };
  const userNoUsernameSpace = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '2020ada',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: '       ',
  };

  const userNoPasswordSpace = {
    firstname: 'akaniru',
    lastname: 'precious',
    othernames: 'presh',
    email: 'presh@gmail.com',
    password: '     ',
    type: 'citizen',
    phonenumber: '+234-7032425466',
    username: 'presh',
  };
  it('should return a success status 201 when created succesfully', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it('should return a 400 when created with duplicate data', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should fail to create user if email is missing', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should fail to create user if password is missing', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoPassword)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });


  it('should return correct error when created with invalid email', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userBadEmail)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without firstname', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoFirstname)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without lastname', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoLastName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without type', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoType)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without Phone number', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoPhn)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created without other names', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoOtherName)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when created with wrong type', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userBadType)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when first name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoFirstnameSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when last name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoLastNameSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when other name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoOtherNameSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when email name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoEmailSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when phone number name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoPhnSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when user name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoUsernameSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('should return correct error when password name contain only spaces', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(userNoPasswordSpace)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('Login user', () => {
  const user = {
    email: 'example@yahoo.com',
    password: '2020ada',
  };

  it('should login user with correct details', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  const userLogin = {
    email: 'example@yahoo.com',
    password: '2020xafvda',
  };
  it('should reject login request with wrong credentials', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(userLogin)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
