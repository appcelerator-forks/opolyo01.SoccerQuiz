function createGravatar(options) {
    var md5 = Ti.Utils.md5HexDigest(options.email), url = GRAVATAR_URL + "/" + md5, style = options.defaultStyle || GRAVATAR_DEFAULT_GEOMETRIC, rating = options.rating || GRAVATAR_RATING_G, size = options.size || 80, ext = "extention" in options && options.extention === !0 ? ".jpg" : "", hires = "hires" in options && options.hires === !0, default_image = options.defaultImage || "", image;
    style === GRAVATAR_DEFAULT_CUSTOM && (style = GRAVATAR_DEFAULT_404);
    style === GRAVATAR_DEFAULT_ROBOHASH && (style = Ti.Network.encodeURIComponent(ROBOHASH_URL + "/" + md5 + "?bgset=any&size=" + size + "x" + size));
    url += "?d=" + style;
    url += "&r=" + rating;
    url += "&s=" + size;
    return url;
}

var GRAVATAR_URL = "https://secure.gravatar.com/avatar", GRAVATAR_DEFAULT_404 = "404", GRAVATAR_DEFAULT_OUTLINE = "mm", GRAVATAR_DEFAULT_GEOMETRIC = "identicon", GRAVATAR_DEFAULT_MONSTER = "monsterid", GRAVATAR_DEFAULT_FACES = "wavater", GRAVATAR_DEFAULT_RETRO = "retro", GRAVATAR_DEFAULT_CUSTOM = "custom", GRAVATAR_DEFAULT_ROBOHASH = "robohash", ROBOHASH_URL = "http://robohash.org/", GRAVATAR_RATING_G = "g", GRAVATAR_RATING_PG = "pg", GRAVATAR_RATING_R = "r", GRAVATAR_RATING_X = "x";

exports.createGravatar = createGravatar;

exports.DEFAULT_STYLE_404 = GRAVATAR_DEFAULT_404;

exports.DEFAULT_STYLE_OUTLINE = GRAVATAR_DEFAULT_OUTLINE;

exports.DEFAULT_STYLE_GEOMETRIC = GRAVATAR_DEFAULT_GEOMETRIC;

exports.DEFAULT_STYLE_MONSTER = GRAVATAR_DEFAULT_MONSTER;

exports.DEFAULT_STYLE_FACES = GRAVATAR_DEFAULT_FACES;

exports.DEFAULT_STYLE_RETRO = GRAVATAR_DEFAULT_RETRO;

exports.DEFAULT_STYLE_CUSTOM = GRAVATAR_DEFAULT_CUSTOM;

exports.DEFAULT_STYLE_ROBOHASH = GRAVATAR_DEFAULT_ROBOHASH;

exports.RATING_G = "g";

exports.RATING_PG = "pg";

exports.RATING_R = "r";

exports.RATING_X = "x";