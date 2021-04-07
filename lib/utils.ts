import deburr from 'lodash.deburr';
import kebabCase from 'lodash.kebabcase';

const createSlug = (text: string) : string => kebabCase(deburr(text));

export {
  createSlug,
};
