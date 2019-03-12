/**
 * Application errors
 */
module.exports = {
     /**
   * @api / 1001 - MissingParameters
   * @apiName MissingParameters
   * @apiGroup Errors
   *
   * @apiDescription message: Missing required parameters
   */
  /**
   * @apiDefine MissingParameters
   * @apiError MissingParameters Code 1002
   */
    'MissingParameters': {
        code: 1001,
        message: 'Missing required parameters'
    },
     /**
   * @api / 1002 - ValidationError
   * @apiName ValidationError
   * @apiGroup Errors
   *
   * @apiDescription message: Validation error
   */
  /**
   * @apiDefine ValidationError
   * @apiError ValidationError Code 1002
   */
    'ValidationError': {
        code: 1002,
        message: 'Validation error'
    },
    /**
   * @api / 1003 - InvalidCredentials
   * @apiName InvalidCredentials
   * @apiGroup Errors
   *
   * @apiDescription message: Invalid credentials
   */
  /**
   * @apiDefine InvalidCredentials
   * @apiError InvalidCredentials Code 1003
   */
    'InvalidCredentials': {
        code: 1003,
        message: 'Invalid credentials'
    },
  /**
   * @api / 1004 - UserAlreadyExists
   * @apiName UserAlreadyExists
   * @apiGroup Errors
   *
   * @apiDescription message: User already exists
   */
  /**
   * @apiDefine UserAlreadyExists
   * @apiError UserAlreadyExists Code 1004
   */
    'UserAlreadyExists': {
        code: 1004,
        message: 'User already exists'
    },
    /**
   * @api / 1005 - UserNotFound
   * @apiName UserNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: User not found
   */
  /**
   * @apiDefine UserNotFound
   * @apiError UserNotFound Code 1005
   */
    'UserNotFound': {
    code: 1005,
        message: 'User not found'
    },
    /**
   * @api / 1006 - ArticleNotFound
   * @apiName ArticleNotFound
   * @apiGroup Errors
   *
   * @apiDescription message: Article not found
   */
  /**
   * @apiDefine ArticleNotFound
   * @apiError ArticleNotFound Code 1006
   */
    'ArticleNotFound': {
    code: 1006,
        message: 'Article not found'
    },
}