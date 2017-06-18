'use strict'

const View = use('View')
const Env = use('Env')

class Helper {

  * handle (request, response, next) {

    if (request.currentUser) {
      yield this.checkPermission(request, response)
    }
    yield this.formatDate(response)
    yield this.formatTimestamp(response)
    yield this.formatTimestampfromString(response)
    yield this.formatDatefromString(response)
    yield this.trimString(response)
    yield this.algolia(response)
    yield this.secretparam(response)
    yield this.checkLogin(request, response)

    yield next
  }

  * checkPermission (request, response) {
    let user_permissions = yield request.currentUser.permissions().fetch()
    user_permissions = user_permissions.toJSON()

    response.viewInstance.global('checkPermission', (feature) => {
        if(typeof feature != 'undefined') {
          for (var i = 0; i < user_permissions.length; i++) {
              if (user_permissions[i]['name'] === feature) {
                  return true;
              }
          }
          return false
        }
        return false
    })
  }

  * formatDate (response) {
    var moment = require('moment');
    response.viewInstance.global('formatDate', (date) => {
        if(typeof date != 'undefined') {
          return moment(date, 'MM-DD-YYYY').format('Do MMMM YYYY')
        }
        return 0
    })
  }

  * formatTimestamp (response) {
    var moment = require('moment');
    response.viewInstance.global('formatTimestamp', (date) => {
        if(typeof date != 'undefined') {
          return moment(date, 'MM-DD-YYYY kk:mm:ss').format('Do MMMM YYYY hh:mm A')
        }
        return 0
    })
  }

  * formatTimestampfromString (response) {
    var moment = require('moment');
    response.viewInstance.global('formatTimestampfromString', (date) => {
        if(typeof date != 'undefined') {
          return moment(date, 'YYYY-MM-DD kk:mm:ss').format('Do MMMM YYYY hh:mm A')
        }
        return 0
    })
  }

  * formatDatefromString (response) {
    var moment = require('moment');
    response.viewInstance.global('formatDatefromString', (date) => {
        if(typeof date != 'undefined') {
          return moment(date, 'YYYY-MM-DD kk:mm:ss').format('Do MMMM YYYY')
        }
        return 0
    })
  }

  * trimString (response) {
    response.viewInstance.global('trimString', (string) => {
        if (string.length > 36) {
            return string.substring(0, 34) + ".."
        }else{
            return string
        }
    })
  }

  * algolia (response) {
    const appKey = Env.get('ALGOLIA_APP')
    const searchKey = Env.get('ALGOLIA_SEARCH_KEY')
    const index = Env.get('ALGOLIA_INDEX')

    const algoliaKeys = [appKey, searchKey, index]

    response.viewInstance.global('algolia', (key) => {
        if (algoliaKeys[key] === undefined || algoliaKeys[key] == null) {
            return 'Key not found.';
        }
        return algoliaKeys[key]
    })
  }

  * secretparam (response) {
      var btoa = require('btoa')
      const time = new Date().getTime() / 1000
      const check = btoa(time)
      const check1 = btoa(time + "Nikhil")

      const keys = [check, check1]

      response.viewInstance.global('secretparam', (key) => {
          if (keys[key] === undefined || keys[key] == null) {
              return 'Key not found.';
          }
          return keys[key]
      })
  }

  * checkLogin (request, response) {
      let loggedIn = false
      if (request.plainCookie('PHPSESSID') != undefined && request.plainCookie('PHPSESSID') != null && request.plainCookie('PHPSESSID').length) {
          loggedIn = true
      }

      response.viewInstance.global('checkLogin', () => {
          return loggedIn
      })
  }

}

module.exports = Helper
