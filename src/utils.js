/*
 * If this is the first cache, lastName won't include a |
 * and the regex will return null
 */
function removeStatus(lastName) {
  const stripped = /(.*)\s\|.*$/.exec(lastName);
  return stripped ? stripped[1] : lastName;
}

module.exports = {
  removeStatus,
};
