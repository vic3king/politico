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
      name: partyInfo.name.trim(),
      hqAddressUrl: partyInfo.hqAddressUrl,
      logoUrl: partyInfo.logoUrl,
      createdOn: new Date(),
      createdBy: 'Admin',
      status: 'new',
    };
    this.party.push(createParty);
    return createParty;
  }

  findById(id) {
    // eslint-disable-next-line radix
    return this.party.find(party => party.id === parseInt(id));
  }

  findAllParties() {
    return this.party;
  }

  updateParty(id, userInfo) {
    const partyUp = this.findById(id);
    const index = this.party.indexOf(partyUp);
    this.party[index].name = userInfo.name.trim();
    this.party[index].modfiedOn = new Date();
    return this.party[index];
  }
}

export default new PoliticoParty();
