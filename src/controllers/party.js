/* eslint-disable prefer-const */
import Validate from '../middlewares/helper';
import db from '../db/index';

const PartyController = {
  async createParty(request, response) {
    if (Validate.spaces(request.body)) {
      return response.status(400).send({
        status: 400,
        error: {
          message: 'Fields should contain actual characters and not only spaces',
        },
      });
    }
    const address = request.hqAddress;
    let { name, hqAddress, logoUrl } = request.body;
    hqAddress = address;

    const text = `INSERT INTO
          party(name, hqaddress, logourl, status, created_on, modefied_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
    const values = [
      name.trim(),
      hqAddress,
      logoUrl,
      'new',
      new Date(),
      new Date(),
    ];

    try {
      const { rows } = await db.query(text, values);
      return response.status(201).send({
        status: 201,
        message: 'Political Party Created',
        data: rows[0],
      });
    } catch (error) {
      return response.status(400).send({
        status: 400,
        error: {
          message: error.message,
        },
      });
    }
  },

  async getOneParty(req, res) {
    const text = 'SELECT * FROM party WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'party not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },

  async getAllParties(req, res) {
    const findAllQuery = 'SELECT * FROM party';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({
        status: 200,
        message: 'All parties retrieved',
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: error.message,
      });
    }
  },

  async updatedName(req, res) {
    const findOneQuery = 'SELECT * FROM party WHERE id=$1';
    const updateOneQuery = `UPDATE party
      SET name=$1,modefied_on=$2,status=$3
      WHERE id=$4 returning id, name, status, modefied_on`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'party not found, enter a valid id',
        });
      }
      const values = [
        req.body.name.trim(),
        new Date(),
        'updated',
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send({
        status: 200,
        message: 'Party name updated succesfully',
        data: response.rows[0],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: {
          message: error.message,
        },
      });
    }
  },


  async deleteOneParty(req, res) {
    const deleteQuery = 'DELETE FROM party WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'party not found, enter a valid id',
        });
      }
      return res.status(200).send({
        status: 200,
        message: 'party has been deleted',
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },

  async getPartyAndMembers(req, res) {
    const text = `SELECT party.id, party.name, party.hqaddress, party.logourl, party.status, users.firstname AS firstname, users.lastname AS lastname, candidates.user_id AS user, candidates.party AS party
    FROM candidates JOIN party
    ON candidates.party = party.id
    JOIN users ON candidates.user_id = users.id
    WHERE party = $1`;
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: 'party not found',
        });
      }
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'enter a valid id',
      });
    }
  },
};

export default PartyController;
