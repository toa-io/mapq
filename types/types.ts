declare namespace core.map {

  type transformation = (value: any, source?: object, context?: any) => any

  type value = any | any[]

  type rule = [string, transformation] | { [key: string]: rule } | value

  type apply = (rule: any, scope?: Scope) => any

  type Scope = {
    source: object,
    context: any,
    promises: Promise<any>[]
    apply: apply
  }

}
