import pathOr from 'ramda/src/pathOr'
import path from 'ramda/src/path'
import pathEq from 'ramda/src/pathEq'
import prop from 'ramda/src/prop'
import compose from 'ramda/src/compose'
import is from 'ramda/src/is'
import isNil from 'ramda/src/isNil'
import not from 'ramda/src/not'
import pick from 'ramda/src/pick'
import merge from 'ramda/src/merge'
import complement from 'ramda/src/complement'
import has from 'ramda/src/has'
import isEmpty from 'ramda/src/isEmpty'
import assocPath from 'ramda/src/assocPath'
import dissocPath from 'ramda/src/dissocPath'
import values from 'ramda/src/values'
import contains from 'ramda/src/contains'
import propOr from 'ramda/src/propOr'
import filter from 'ramda/src/filter'
import toLower from 'ramda/src/toLower'
import split from 'ramda/src/split'
import join from 'ramda/src/join'
import replace from 'ramda/src/replace'
import toUpper from 'ramda/src/toUpper'
import map from 'ramda/src/map'
import toPairs from 'ramda/src/toPairs'
import omit from 'ramda/src/omit'

const dashify = compose(join('-'), split(' '), toLower)
const firstUpper = replace(/^./, toUpper)
const dedashify = compose(join(''), map(firstUpper), split('-'))

export default {
  pathOr,
  path,
  prop,
  pathEq,
  compose,
  is,
  isNil,
  not,
  pick,
  has,
  merge,
  complement,
  isEmpty,
  assocPath,
  dissocPath,
  values,
  contains,
  propOr,
  filter,
  dashify,
  dedashify,
  toPairs,
  map,
  omit
}
