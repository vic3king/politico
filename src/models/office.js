class PoliticoOffice {
  constructor() {
    this.office = [];
  }

  createOffice(officeInfo) {
    const createOffice = {
      id: this.office.length + 1,
      type: officeInfo.type.trim(),
      officeName: officeInfo.officeName.trim(),
      age: officeInfo.age.trim(),
      createdBy: 'Admin',
      status: 'new',
      createdOn: new Date(),
      modifiedOn: new Date(),
    };

    this.office.push(createOffice);
    return createOffice;
  }
}
export default new PoliticoOffice();
