const Contact = require('../../models/Contact');
const STATUS = require('../../modules/STATUS');
const Logger = require('../../modules/Logger');

const Contacts = {
  async getAll() {
    try {
      const contacts = await Contact.findAll();

      if(!contacts.length){
        return {success: true, status: STATUS.NOT_FOUND, contacts: []}
      }
      return {success: true, status: STATUS.OK, contacts}
    } catch (err) {
      Logger.createLog(err);
      return {success: false, status: STATUS.INTERNAL_ERROR, contacts: []}
    }
  },

  async add(contactData) {
    try {
      const contact = await new Contact(contactData).save(contactData);
      return {success: true, status: STATUS.OK, contacts: [contact]}
    } catch (err) {
      if(err.name === 'SequelizeUniqueConstraintError'){
        return {success: false, status: STATUS.DUPLICATE, contacts: [], message: `Contact with email ${contactData.email} already exists`}
      }
      if(err.name === 'SequelizeValidationError'){
        return {success: false, status: STATUS.INVALID_INPUT_PARAMETERS, contacts: [], message: err.message};
      }
      Logger.createLog(err);
      return {success: false, status: STATUS.INTERNAL_ERROR, contacts: [], message: 'Internal server error'}
    }
  },

  async update(contactData, id) {
    try {
      const updateResult = await Contact.update(contactData, {where: {id}, returning: true, plain: true});
      return {success: true, status: STATUS.OK, contacts: [updateResult[1].dataValues]}
    } catch (err) {
      if(err.name === 'SequelizeUniqueConstraintError'){
        return {success: false, status: STATUS.DUPLICATE, contacts: [], message: `Contact with email ${contactData.email} already exists`}
      }
      if(err.name === 'SequelizeValidationError'){
        return {success: false, status: STATUS.INVALID_INPUT_PARAMETERS, contacts: [], message: err.message};
      }
      Logger.createLog(err);
      return {success: false, status: STATUS.INTERNAL_ERROR, contacts: []}
    }
  },

  async delete(id) {
    try {
      const contact = await Contact.findOne({where: {id}});
      if(!contact){
        return {success: true, status: STATUS.NOT_FOUND, id: false, message: `Contact with id ${id} not found`}
      }

      const deleteResult = await Contact.destroy({where: {id}});
      return {success: true, status: STATUS.OK, contacts: [contact]}
    } catch (err) {
      Logger.createLog(err);
      return {success: false, status: STATUS.INTERNAL_ERROR, id: false, message: 'Internal server error'}
    }
  },
};

module.exports = Contacts;