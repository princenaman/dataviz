'use strict'

const Lucid = use('Lucid')

class Trivago extends Lucid {

  static get table () {
    return 'mytable'
  }
}

module.exports = Trivago
