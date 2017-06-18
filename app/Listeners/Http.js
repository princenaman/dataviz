'use strict'

const Env = use('Env')
const Youch = use('youch')
const Http = exports = module.exports = {}

/**
 * handle errors occured during a Http request.
 *
 * @param  {Object} error
 * @param  {Object} request
 * @param  {Object} response
 */
Http.handleError = function * (error, request, response) {
  const status = error.status || 500

  /**
   * DEVELOPMENT REPORTER
   */
  if (Env.get('NODE_ENV') === 'development') {
    const youch = new Youch(error, request.request)
    const type = request.accepts('json', 'html')
    const formatMethod = type === 'json' ? 'toJSON' : 'toHTML'
    const formattedErrors = yield youch[formatMethod]()
    response.status(status).send(formattedErrors)
    return
  }

  /**
   * PRODUCTION REPORTER
   */
  // console.error(error.stack)
  var Raven = require('raven');
  Raven.config('https://2284d98c112f451db663624b4618917e:082b85c8705540aaa489fc5013a78908@sentry.io/174397').install();
  Raven.captureException(error);

  if (error.status == 401) {
    yield response.status(status).sendView('errors/401', {error})
    return
  }else if (error.status == 404) {
    yield response.status(status).sendView('errors/404', {error})
    return
  }else if (error.status == 503) {
    yield response.status(status).sendView('errors/503', {error})
    return
  }

  if (error.name === 'ModelNotFoundException') {
    yield response.status(404).sendView('errors/404', {error})
    return
  }

  if (error.name === 'InvalidLoginException') {
      yield response.status(401).sendView('errors/401', {error})
      return
  }

  if (error.name === 'PasswordMisMatch') {
    yield response.status(401).sendView('errors/401', {error})
    return
  }

  yield response.status(status).sendView('errors/500', {error})
  return
}

/**
 * listener for Http.start event, emitted after
 * starting http server.
 */
Http.onStart = function () {

    // Create a App Specific Global method url()
    const View = use('View')
    let baseUrl = "//"
    baseUrl += Env.get('SERVER', 'localhost:2208') + '/'
    View.global('url', (path) => {
      if(typeof path != 'undefined') {
        path = (path.substring(0, 1) == '/')
          ? path.substring(1)
          : path
        return baseUrl + path
      }
      return baseUrl
    })

    View.filter('acronym', function (string) {
        var matches = string.match(/\b(\w)/g);
        var acronym = matches.join('');
        return acronym
    })

}
