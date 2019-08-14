import Component from '@ember/component';
import { computed } from '@ember/object';

import md5 from 'md5';

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt', 'title', 'size:height', 'size:width'],
  classNames: ['gravatar-image'],
  size: 250,
  email: '',
  title: '',
  defaultImage: '',
  secure: true,
  retina: false,
  hash: null,

  src: computed('email', 'imageSize', 'default', 'hash', function() {
    var email = this.get('email');
    var imageSize = this.get('imageSize');
    var def = this.get('defaultImage');
    var secure = this.get('secure');
    var protocol = secure ? 'https' : 'http';

    var hashToUse = this.get('hash') || md5(email);
    return protocol + '://www.gravatar.com/avatar/' + hashToUse + '?s=' + imageSize + '&d=' + def;
  }),

  imageSize: computed('size', 'retina', function() {
    var size = this.get('size');
    return this.get('retina') ? (size * 2) : size;
  })
});
