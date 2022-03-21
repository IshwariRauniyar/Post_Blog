const HttpStatus = require("http-status-codes");
const userService = require("../services/userService");
/**
 * Get all User.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = async function fetchAll(req, res) {
  const data = await userService.getAllUser();

  return res.status(HttpStatus.OK).json({
    success: true,
    message: "All User are fetched.",
    code: HttpStatus.OK,
    ...(data && { ...data }),
  });
};

/**
 * Get a user by its id.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = async function fetchById(req, res) {
  const userId = parseInt(req.params.id, 10);

  const data = await userService.getUser(userId, fields);

  return res.status(HttpStatus.OK).json({
    success: true,
    message: "user is fetched.",
    code: HttpStatus.OK,
    ...(data && { results: data }),
  });
};

/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = async function create(req, res) {
  const data = await userService.createUser(req.body);

  return res.status(HttpStatus.CREATED).json({
    success: true,
    message: "user is created.",
    code: HttpStatus.CREATED,
    ...(data && { results: data }),
  });
};

/**
 * Update a user.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = async function update(req, res) {
  const userId = parseInt(req.params.id, 10);

  const data = await userService.updateUser(userId, req.body);

  return res.status(HttpStatus.CREATED).json({
    success: true,
    message: "user is updated.",
    code: HttpStatus.CREATED,
    ...(data && { results: data }),
  });
};

/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 */
module.exports = async function deleteuser(req, res) {
  const userId = parseInt(req.params.id, 10);

  const data = await userService.deleteUser(userId);

  return res.status(HttpStatus.NO_CONTENT).json({
    success: true,
    message: "user is deleted.",
    code: HttpStatus.NO_CONTENT,
    ...(data && { results: data }),
  });
};
