const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);
const validator = require('validator');

const sanitizeData = (data) => {
  let sanitizedData = DOMPurify.sanitize(data);
  sanitizedData = validator.escape(sanitizedData);
  sanitizedData = sanitizedData.trim();
  return sanitizedData;
};

module.exports = sanitizeData;
