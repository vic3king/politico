class PoliticoOffice {
  constructor() {
    this.office = [];
  }

  createOffice(officeInfo) {
    const createOffice = {
      id: this.office.length + 1,
      type: officeInfo.type.trim(),
      name: officeInfo.name.trim(),
      ageLimit: officeInfo.ageLimit.trim(),
      createdBy: 'Admin',
      status: 'new',
      createdOn: new Date(),
      modifiedOn: new Date(),
    };

    this.office.push(createOffice);
    return createOffice;
  }

  findAllOffices() {
    return this.office;
  }

  findById(id) {
    // eslint-disable-next-line radix
    return this.office.find(office => office.id === parseInt(id));
  }
}
export default new PoliticoOffice();
