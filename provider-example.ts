import ProviDB from "."

export default class Provider<
  Value extends boolean | number | string = boolean | number | string
  > extends ProviDB<Value> {
  static database: any = {}

  constructor(name: string) {
    super(name)
  }

  get db(): { [key: string]: Value } {
    return Provider.database[this.name]
  }

  delete(key: string): Promise<this> {
    delete this.db[key]
    return Promise.resolve(this)
  }

  deleteAll(): Promise<this> {
    for (const key in Object.keys(this.db)) delete this.db[key]

    return Promise.resolve(this)
  }

  async each(forEach: (value: Value, key: string) => unknown): Promise<this> {
    for (const key in Object.keys(this.db)) await forEach(this.db[key], key)

    return this
  }

  async eachOf<
    value extends Value = Value,
    SubKey extends string | number = string | number,
    SubValue extends Value = Value
    >(
    key: string,
    forEach: (value: SubValue, key: SubKey) => unknown
  ): Promise<value | undefined> {
    const value = await this.get<value>(key)

    if (!value) return

    if (Array.isArray(value))
      for (const subValue of value) // @ts-ignore
        await forEach(subValue, value.indexOf(subValue))

    if (typeof value === "object")
      for (const key in Object.keys(value)) // @ts-ignore
        await forEach(value[key], key)

    return value
  }

  async ensure<value extends Value = Value>(
    key: string,
    defaultValue: value
  ): Promise<value> {
    let value = await this.get<value>(key)

    if (value === undefined) {
      value = defaultValue
      await this.set(key, value)
    }

    return value
  }

  async find<value extends Value = Value>(
    test: (value: Value, key: string) => boolean
  ): Promise<value | undefined> {
    for (const key in Object.keys(this.db))
      if (await test(this.db[key], key))
        // @ts-ignore
        return this.db[key]

    return Promise.resolve(undefined)
  }

  get<value extends Value = Value>(key: string): Promise<value | undefined> {
    // @ts-ignore
    return Promise.resolve(this.db[key])
  }

  set<value extends Value = Value>(key: string, value: value): Promise<this> {
    this.db[key] = value
    return Promise.resolve(this)
  }

  async setup(name: string): Promise<void> {
    Provider.database[name] = {}
  }
}