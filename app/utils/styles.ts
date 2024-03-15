const VAL_STR = "%val%";

const templates = {
  m: {
    left: "margin",
    right: VAL_STR,
  },
  mt: {
    left: "marginTop",
    right: VAL_STR,
  },
  mb: {
    left: "marginBottom",
    right: VAL_STR,
  },
  my: {
    left: "margin",
    right: `${VAL_STR} 0`,
  },
  mx: {
    left: "margin",
    right: `0 ${VAL_STR}`,
  },
  ml: {
    left: "marginLeft",
    right: VAL_STR,
  },
  mr: {
    left: "marginRight",
    right: VAL_STR,
  },
  minw: {
    left: "minWidth",
    right: VAL_STR,
  },
  maxw: {
    left: "maxWidth",
    right: VAL_STR,
  },
  w: {
    left: "width",
    right: VAL_STR,
  },
  maxh: {
    left: "maxHeight",
    right: VAL_STR,
  },
  h: {
    left: "height",
    right: VAL_STR,
  },
  p: {
    left: "padding",
    right: VAL_STR,
  },
  pt: {
    left: "paddingTop",
    right: VAL_STR,
  },
  pb: {
    left: "paddingBottom",
    right: VAL_STR,
  },
  py: {
    left: "padding",
    right: `${VAL_STR} 0`,
  },
  px: {
    left: "padding",
    right: `0 ${VAL_STR}`,
  },
  pl: {
    left: "paddingLeft",
    right: VAL_STR,
  },
  pr: {
    left: "paddingRight",
    right: VAL_STR,
  },
  overflow: {
    overflow: VAL_STR,
  },
  text: {
    left: "textTransform",
    right: VAL_STR,
  }
};

export function propsToStyles(props) {
  const { style = {}, ...other } = props;

  const generated = Object.keys(other).reduce((acc, key) => {
    if (templates[key]) {
      const template = templates[key];
      const spacer = props[key];
      return {
        ...acc,
        [template.left]: template.right.replace(VAL_STR, spacer),
      };
    }
    return acc;
  }, {});

  return {
    ...generated,
    ...style,
  }
}
