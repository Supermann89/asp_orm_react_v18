function setCookie(name, value, options = {}) {
  options = {
    path: "/",
    secure: true,
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  /* eslint-disable-next-line */
  name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");

  var regex = new RegExp("(?:^|;)\\s?" + name + "=(.*?)(?:;|$)", "i"),
    match = document.cookie.match(regex);

  return match ? decodeURIComponent(match[1]) : undefined;
  //return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export { setCookie, getCookie, deleteCookie };
