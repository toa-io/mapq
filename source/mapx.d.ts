declare namespace mapx {

  type transformation = (value: any, source?: object, context?: any) => any

  type value = any | any[]

  type rules = [string, transformation] | { [key: string]: rules } | value

  type apply = (rule: any, scope?: Scope) => any

  type Scope = {
    source: object,
    context: any,
    promises: Promise<any>[]
    apply: apply
  }

}

export default function (rules: mapx.rules, source: object, context?: any): object | Promise<object>
