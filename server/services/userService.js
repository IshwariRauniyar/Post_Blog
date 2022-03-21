const Boom = require("@hapi/boom");
const User = require("../models/user");

/**
 * Get all User.
 *
 * @returns {Promise}
 * @param {Number} offset
 * @param {Number} limit
 * @param {Array} fields
 */

async function getAllUser() {
  const Users = await User.findAndCountAll({});
  return {
    results: Users.rows,
    total: Users.count,
  };
}

/**
 * Get a User.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 * @param {Array} fields
 */
module.exports = async function getUser(id) {
  const Users = await User.findByPk(id);
  if (!Users) throw Boom.notFound("User not found");
  return Users;
};

/**
 * Create new User.
 *
 * @param   {Object}  User
 * @returns {Promise}
 */
module.exports = async function createUser({
  FullName,
  Email,
  Password,
  UserName,
  UserRole,
}) {
  const Users = await User.create({
    FullName,
    Email,
    Password,
    UserName,
    UserRole,
  });

  return Users;
};

/**
 * Update a User.
 *
 * @param   {Number|String}  id
 * @param   {Object}         User
 * @returns {Promise}
 */
module.exports = async function updateUser(
  id,
  { FullName, Email, Password, UserName, UserRole }
) {
  const Users = await User.findByIdAndUpdate(
    {
      FullName,
      Email,
      Password,
      UserName,
      UserRole,
    },
    { where: { _id: id } }
  );
  return Users.findByPk(id);
};

/**
 * Delete a User.
 *
 * @param   {Number|String}  id
 * @returns {Promise}
 */
module.exports = async function deleteUser(id) {
  const Users = await User.destroy({ where: { _id: id } });

  return Users;
};
