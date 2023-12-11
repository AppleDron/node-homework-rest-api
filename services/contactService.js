const { countDocuments, getContacts } = require("../models/contacts");

class ContactService {
  async getAllContacts({ page, limit, favorite }) {
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 20;

    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;

    const results = {};
    const filter = {};

    if (favorite) {
      filter.favorite = favorite === "true";
    }

    if (endIndex < (await countDocuments(filter))) {
      results.next = {
        page: pageInt + 1,
        limit: limitInt,
        favorite: filter.favorite,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: pageInt - 1,
        limit: limitInt,
        favorite: filter.favorite,
      };
    }

    return (results.results = await getContacts(limitInt, startIndex, filter));
  }
}

const contactService = new ContactService();
module.exports = contactService;
