export const _getSearchibleFields = (fields) => {
  return fields
    .filter((cell) => cell?.searchible)
    .map((item) => {
      return item?.id;
    });
};

/* For smart filtering we want to allow the search to work regardless of
 * word order. We also want double quoted text to be preserved, so word
 * order is important - a la google. So this is what we want to
 * generate:
 *
 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
 */
export const _createRegExpFilter = (str) => {
  let matches = str.match(/"[^"]+"|[^ ]+/g) || [""];

  let a = matches.map((word) => {
    if (word.charAt(0) === '"') {
      var m = word.match(/^"(.*)"$/);
      word = m ? m[1] : word;
    }

    return word.replace('"', "");
  });

  let search = "^(?=.*?" + a.join(")(?=.*?") + ").*$";

  return new RegExp(search, "i");
};

export const _searchFilter = (array, searchibleFields, RegExp) => {
  return array.filter((item) => {
    let isMatch = false;
    let i = 0;
    while (i <= searchibleFields.length && !isMatch) {
      isMatch = RegExp.test(item[searchibleFields[i]]);
      i++;
    }
    return isMatch;
  });
};
