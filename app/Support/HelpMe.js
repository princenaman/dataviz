'use strict'

let HelpMe = exports = module.exports = {}

HelpMe.random = function (count) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( let i=0; i < count; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

HelpMe.isVideo = function (extension) {
  let supported = ['3gp', '3gpp', '3gpp2', 'annodex', 'divx', 'flv', 'h264', 'mp4',
    'mp4v-es', 'mpeg', 'mpeg-2', 'mpeg4', 'ogg', 'ogm', 'quicktime',
    'ty', 'vdo', 'vivo', 'vnd.rn-realvideo', 'vnd.vivo', 'webm', 'avi'
  ]

  if (supported.indexOf(extension) > -1) {
    return true
  }

  return false
}

HelpMe.isDocument = function (extension) {
  let supported = ['xps', 'avs', 'bmp', 'dcx', 'dib', 'dpx', 'fax', 'fits',
    'fpx', 'gif', 'ico', 'iptc', 'jbig', 'jp2', 'jpeg', 'jpg',
    'mdi', 'miff', 'mng', 'mpc', 'mtv', 'otb', 'pbm', 'pcd',
    'pcds', 'pct', 'pcx', 'pgm', 'pict', 'png', 'pnm', 'ppm',
    'psd', 'p7', 'ras', 'rgba', 'sun', 'tga', 'tiff', 'tif',
    'vicar', 'vid', 'viff', 'wmf', 'xbm', 'xpm', 'xwd',
    'csv', 'xls', 'xlsb', 'xlsx', 'xlt', 'xltx',
    'mml', 'odc', 'odf', 'odg', 'odi', 'odm', 'odp', 'ods',
    'odt', 'otg', 'oth', 'otp', 'ots', 'pxl', 'sgl', 'smf',
    'srw', 'stc', 'sti', 'stw', 'sxc', 'sxg', 'sxi', 'sxm',
    'sxw', 'vor', 'wv2', 'pot', 'potx', 'pps', 'ppsx', 'ppt', 'pptx',
    'rtf', 'txt', 'log', 'doc', 'docx', 'dot', 'dotx', 'wpd', 'wps', 'wri'
  ]

  if (supported.indexOf(extension) > -1) {
    return true
  }

  return false
}
