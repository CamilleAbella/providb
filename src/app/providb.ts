/**
 *
 */
export default abstract class ProviDB<
  Value extends boolean | number | string = boolean | number | string
> {
  /**
   *
   * @param name
   * @protected
   */
  protected constructor(public readonly name: string) {
    if (!ProviDB.databaseIsSetup) throw new Error("The database is not setup.")

    this.setup(name)
      .then(() => (this.isSetup = true))
      .catch((error) => {
        throw new Error(
          `Error occurred during setup of "${name}" collection.\nError: ${error.message}`
        )
      })
  }

  /**
   *
   */
  abstract get db(): any

  static get databaseIsSetup(): boolean {
    return this.database === undefined
  }

  /**
   *
   */
  static database: any

  /**
   *
   * @private
   */
  private isSetup: boolean = false

  /**
   *
   * @param name
   * @private
   */
  abstract setup(name: string): Promise<void>

  /**
   *
   * @param key
   */
  abstract delete(key: string): Promise<this>

  /**
   *
   */
  abstract deleteAll(): Promise<this>

  /**
   *
   * @param key
   */
  abstract get<value extends Value = Value>(
    key: string
  ): Promise<value | undefined>

  /**
   *
   * @param key
   * @param value
   */
  abstract set<value extends Value = Value>(
    key: string,
    value: value
  ): Promise<this>

  /**
   *
   * @param key
   * @param defaultValue
   */
  abstract ensure<value extends Value = Value>(
    key: string,
    defaultValue: value
  ): Promise<value>

  /**
   *
   * @param test
   */
  abstract find<value extends Value = Value>(
    test: (value: Value, key: string) => boolean
  ): Promise<value | undefined>

  /**
   *
   * @param forEach
   */
  abstract each(forEach: (value: Value, key: string) => unknown): Promise<this>

  /**
   *
   * @param key
   * @param forEach
   * @deprecated
   */
  abstract eachOf<
    value extends Value = Value,
    SubKey extends string | number = string | number,
    SubValue extends Value = Value
  >(
    key: string,
    forEach: (value: SubValue, key: SubKey) => unknown
  ): Promise<value | undefined>
}
