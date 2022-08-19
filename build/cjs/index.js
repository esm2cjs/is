"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var esm_exports = {};
__export(esm_exports, {
  assert: () => assert,
  default: () => esm_default
});
module.exports = __toCommonJS(esm_exports);
const typedArrayTypeNames = [
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Uint16Array",
  "Int32Array",
  "Uint32Array",
  "Float32Array",
  "Float64Array",
  "BigInt64Array",
  "BigUint64Array"
];
function isTypedArrayName(name) {
  return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
  "Function",
  "Generator",
  "AsyncGenerator",
  "GeneratorFunction",
  "AsyncGeneratorFunction",
  "AsyncFunction",
  "Observable",
  "Array",
  "Buffer",
  "Blob",
  "Object",
  "RegExp",
  "Date",
  "Error",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "WeakRef",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Promise",
  "URL",
  "FormData",
  "URLSearchParams",
  "HTMLElement",
  "NaN",
  ...typedArrayTypeNames
];
function isObjectTypeName(name) {
  return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
  "null",
  "undefined",
  "string",
  "number",
  "bigint",
  "boolean",
  "symbol"
];
function isPrimitiveTypeName(name) {
  return primitiveTypeNames.includes(name);
}
function isOfType(type) {
  return (value) => typeof value === type;
}
const { toString } = Object.prototype;
const getObjectType = (value) => {
  const objectTypeName = toString.call(value).slice(8, -1);
  if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
    return "HTMLElement";
  }
  if (isObjectTypeName(objectTypeName)) {
    return objectTypeName;
  }
  return void 0;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
  if (value === null) {
    return "null";
  }
  switch (typeof value) {
    case "undefined":
      return "undefined";
    case "string":
      return "string";
    case "number":
      return Number.isNaN(value) ? "NaN" : "number";
    case "boolean":
      return "boolean";
    case "function":
      return "Function";
    case "bigint":
      return "bigint";
    case "symbol":
      return "symbol";
    default:
  }
  if (is.observable(value)) {
    return "Observable";
  }
  if (is.array(value)) {
    return "Array";
  }
  if (is.buffer(value)) {
    return "Buffer";
  }
  const tagType = getObjectType(value);
  if (tagType) {
    return tagType;
  }
  if (value instanceof String || value instanceof Boolean || value instanceof Number) {
    throw new TypeError("Please don't use object wrappers for primitive types");
  }
  return "Object";
}
is.undefined = isOfType("undefined");
is.string = isOfType("string");
const isNumberType = isOfType("number");
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType("bigint");
is.function_ = isOfType("function");
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith("class ");
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType("symbol");
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion) => {
  if (!Array.isArray(value)) {
    return false;
  }
  if (!is.function_(assertion)) {
    return true;
  }
  return value.every((element) => assertion(element));
};
is.buffer = (value) => {
  var _a, _b, _c;
  return (_c = (_b = (_a = value == null ? void 0 : value.constructor) == null ? void 0 : _a.isBuffer) == null ? void 0 : _b.call(_a, value)) != null ? _c : false;
};
is.blob = (value) => isObjectOfType("Blob")(value);
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
is.object = (value) => !is.null_(value) && (typeof value === "object" || is.function_(value));
is.iterable = (value) => is.function_(value == null ? void 0 : value[Symbol.iterator]);
is.asyncIterable = (value) => is.function_(value == null ? void 0 : value[Symbol.asyncIterator]);
is.generator = (value) => is.iterable(value) && is.function_(value == null ? void 0 : value.next) && is.function_(value == null ? void 0 : value.throw);
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType("Promise")(value);
const hasPromiseApi = (value) => is.function_(value == null ? void 0 : value.then) && is.function_(value == null ? void 0 : value.catch);
is.promise = (value) => is.nativePromise(value) || hasPromiseApi(value);
is.generatorFunction = isObjectOfType("GeneratorFunction");
is.asyncGeneratorFunction = (value) => getObjectType(value) === "AsyncGeneratorFunction";
is.asyncFunction = (value) => getObjectType(value) === "AsyncFunction";
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty("prototype");
is.regExp = isObjectOfType("RegExp");
is.date = isObjectOfType("Date");
is.error = isObjectOfType("Error");
is.map = (value) => isObjectOfType("Map")(value);
is.set = (value) => isObjectOfType("Set")(value);
is.weakMap = (value) => isObjectOfType("WeakMap")(value);
is.weakSet = (value) => isObjectOfType("WeakSet")(value);
is.weakRef = (value) => isObjectOfType("WeakRef")(value);
is.int8Array = isObjectOfType("Int8Array");
is.uint8Array = isObjectOfType("Uint8Array");
is.uint8ClampedArray = isObjectOfType("Uint8ClampedArray");
is.int16Array = isObjectOfType("Int16Array");
is.uint16Array = isObjectOfType("Uint16Array");
is.int32Array = isObjectOfType("Int32Array");
is.uint32Array = isObjectOfType("Uint32Array");
is.float32Array = isObjectOfType("Float32Array");
is.float64Array = isObjectOfType("Float64Array");
is.bigInt64Array = isObjectOfType("BigInt64Array");
is.bigUint64Array = isObjectOfType("BigUint64Array");
is.arrayBuffer = isObjectOfType("ArrayBuffer");
is.sharedArrayBuffer = isObjectOfType("SharedArrayBuffer");
is.dataView = isObjectOfType("DataView");
is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType("URL")(value);
is.urlString = (value) => {
  if (!is.string(value)) {
    return false;
  }
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
is.truthy = (value) => Boolean(value);
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
};
is.typedArray = (value) => isTypedArrayName(getObjectType(value));
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
  if (is.number(range)) {
    return value >= Math.min(0, range) && value <= Math.max(range, 0);
  }
  if (is.array(range) && range.length === 2) {
    return value >= Math.min(...range) && value <= Math.max(...range);
  }
  throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
  "innerHTML",
  "ownerDocument",
  "style",
  "attributes",
  "nodeValue"
];
is.domElement = (value) => is.object(value) && value.nodeType === NODE_TYPE_ELEMENT && is.string(value.nodeName) && !is.plainObject(value) && DOM_PROPERTIES_TO_CHECK.every((property) => property in value);
is.observable = (value) => {
  var _a, _b;
  if (!value) {
    return false;
  }
  if (value === ((_a = value[Symbol.observable]) == null ? void 0 : _a.call(value))) {
    return true;
  }
  if (value === ((_b = value["@@observable"]) == null ? void 0 : _b.call(value))) {
    return true;
  }
  return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Number.POSITIVE_INFINITY || value === Number.NEGATIVE_INFINITY;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
is.emptyMap = (value) => is.map(value) && value.size === 0;
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
is.formData = (value) => isObjectOfType("FormData")(value);
is.urlSearchParams = (value) => isObjectOfType("URLSearchParams")(value);
const predicateOnArray = (method, predicate, values) => {
  if (!is.function_(predicate)) {
    throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
  }
  if (values.length === 0) {
    throw new TypeError("Invalid number of values");
  }
  return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
  const predicates = is.array(predicate) ? predicate : [predicate];
  return predicates.some((singlePredicate) => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {}) => {
  if (!condition) {
    const { multipleValues } = options;
    const valuesMessage = multipleValues ? `received values of types ${[
      ...new Set(value.map((singleValue) => `\`${is(singleValue)}\``))
    ].join(", ")}` : `received value of type \`${is(value)}\``;
    throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
  }
};
const assert = {
  undefined: (value) => assertType(is.undefined(value), "undefined", value),
  string: (value) => assertType(is.string(value), "string", value),
  number: (value) => assertType(is.number(value), "number", value),
  bigint: (value) => assertType(is.bigint(value), "bigint", value),
  function_: (value) => assertType(is.function_(value), "Function", value),
  null_: (value) => assertType(is.null_(value), "null", value),
  class_: (value) => assertType(is.class_(value), "Class", value),
  boolean: (value) => assertType(is.boolean(value), "boolean", value),
  symbol: (value) => assertType(is.symbol(value), "symbol", value),
  numericString: (value) => assertType(is.numericString(value), "string with a number", value),
  array: (value, assertion) => {
    const assert2 = assertType;
    assert2(is.array(value), "Array", value);
    if (assertion) {
      value.forEach(assertion);
    }
  },
  buffer: (value) => assertType(is.buffer(value), "Buffer", value),
  blob: (value) => assertType(is.blob(value), "Blob", value),
  nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined", value),
  object: (value) => assertType(is.object(value), "Object", value),
  iterable: (value) => assertType(is.iterable(value), "Iterable", value),
  asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable", value),
  generator: (value) => assertType(is.generator(value), "Generator", value),
  asyncGenerator: (value) => assertType(is.asyncGenerator(value), "AsyncGenerator", value),
  nativePromise: (value) => assertType(is.nativePromise(value), "native Promise", value),
  promise: (value) => assertType(is.promise(value), "Promise", value),
  generatorFunction: (value) => assertType(is.generatorFunction(value), "GeneratorFunction", value),
  asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), "AsyncGeneratorFunction", value),
  asyncFunction: (value) => assertType(is.asyncFunction(value), "AsyncFunction", value),
  boundFunction: (value) => assertType(is.boundFunction(value), "Function", value),
  regExp: (value) => assertType(is.regExp(value), "RegExp", value),
  date: (value) => assertType(is.date(value), "Date", value),
  error: (value) => assertType(is.error(value), "Error", value),
  map: (value) => assertType(is.map(value), "Map", value),
  set: (value) => assertType(is.set(value), "Set", value),
  weakMap: (value) => assertType(is.weakMap(value), "WeakMap", value),
  weakSet: (value) => assertType(is.weakSet(value), "WeakSet", value),
  weakRef: (value) => assertType(is.weakRef(value), "WeakRef", value),
  int8Array: (value) => assertType(is.int8Array(value), "Int8Array", value),
  uint8Array: (value) => assertType(is.uint8Array(value), "Uint8Array", value),
  uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), "Uint8ClampedArray", value),
  int16Array: (value) => assertType(is.int16Array(value), "Int16Array", value),
  uint16Array: (value) => assertType(is.uint16Array(value), "Uint16Array", value),
  int32Array: (value) => assertType(is.int32Array(value), "Int32Array", value),
  uint32Array: (value) => assertType(is.uint32Array(value), "Uint32Array", value),
  float32Array: (value) => assertType(is.float32Array(value), "Float32Array", value),
  float64Array: (value) => assertType(is.float64Array(value), "Float64Array", value),
  bigInt64Array: (value) => assertType(is.bigInt64Array(value), "BigInt64Array", value),
  bigUint64Array: (value) => assertType(is.bigUint64Array(value), "BigUint64Array", value),
  arrayBuffer: (value) => assertType(is.arrayBuffer(value), "ArrayBuffer", value),
  sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), "SharedArrayBuffer", value),
  dataView: (value) => assertType(is.dataView(value), "DataView", value),
  enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), "EnumCase", value),
  urlInstance: (value) => assertType(is.urlInstance(value), "URL", value),
  urlString: (value) => assertType(is.urlString(value), "string with a URL", value),
  truthy: (value) => assertType(is.truthy(value), "truthy", value),
  falsy: (value) => assertType(is.falsy(value), "falsy", value),
  nan: (value) => assertType(is.nan(value), "NaN", value),
  primitive: (value) => assertType(is.primitive(value), "primitive", value),
  integer: (value) => assertType(is.integer(value), "integer", value),
  safeInteger: (value) => assertType(is.safeInteger(value), "integer", value),
  plainObject: (value) => assertType(is.plainObject(value), "plain object", value),
  typedArray: (value) => assertType(is.typedArray(value), "TypedArray", value),
  arrayLike: (value) => assertType(is.arrayLike(value), "array-like", value),
  domElement: (value) => assertType(is.domElement(value), "HTMLElement", value),
  observable: (value) => assertType(is.observable(value), "Observable", value),
  nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream", value),
  infinite: (value) => assertType(is.infinite(value), "infinite number", value),
  emptyArray: (value) => assertType(is.emptyArray(value), "empty array", value),
  nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array", value),
  emptyString: (value) => assertType(is.emptyString(value), "empty string", value),
  emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace", value),
  nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string", value),
  nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace", value),
  emptyObject: (value) => assertType(is.emptyObject(value), "empty object", value),
  nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object", value),
  emptySet: (value) => assertType(is.emptySet(value), "empty set", value),
  nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set", value),
  emptyMap: (value) => assertType(is.emptyMap(value), "empty map", value),
  nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map", value),
  propertyKey: (value) => assertType(is.propertyKey(value), "PropertyKey", value),
  formData: (value) => assertType(is.formData(value), "FormData", value),
  urlSearchParams: (value) => assertType(is.urlSearchParams(value), "URLSearchParams", value),
  evenInteger: (value) => assertType(is.evenInteger(value), "even integer", value),
  oddInteger: (value) => assertType(is.oddInteger(value), "odd integer", value),
  directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T", instance),
  inRange: (value, range) => assertType(is.inRange(value, range), "in range", value),
  any: (predicate, ...values) => assertType(is.any(predicate, ...values), "predicate returns truthy for any value", values, { multipleValues: true }),
  all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values", values, { multipleValues: true })
};
Object.defineProperties(is, {
  class: {
    value: is.class_
  },
  function: {
    value: is.function_
  },
  null: {
    value: is.null_
  }
});
Object.defineProperties(assert, {
  class: {
    value: assert.class_
  },
  function: {
    value: assert.function_
  },
  null: {
    value: assert.null_
  }
});
var esm_default = is;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assert
});
//# sourceMappingURL=index.js.map
