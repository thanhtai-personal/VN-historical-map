import { pickBy } from "./lodash/pickBy"

type ParamsObject = { [key: string]: any }

export const buildParams = (params: ParamsObject): Record<string, any> =>
  pickBy(params, (v) => v != null && v.toString().trim() !== '')