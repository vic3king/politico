class PoliticoParty {
  /**
   * class constructor
    * @param {object} recordInfo
   */
  constructor() {
    this.party = [];
  }

  /**
   *
   * @returns {object} records object
   */
  createParty(partyInfo) {
    const createParty = {
      id: this.party.length + 1,
      name: partyInfo.name,
      hqAddressUrl: partyInfo.hqAddressUrl,
      logoUrl: partyInfo.logoUrl,
      createdOn: new Date(),
      createdBy: 'Admin',
      status: 'new',
    };
    this.party.push(createParty);
    return createParty;
  }
}

export default new PoliticoParty();
