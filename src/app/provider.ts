/**
 *
 */
export interface ProviderConfig {}

/**
 *
 */
export abstract class Provider<
  Value extends boolean | number | string = boolean | number | string
> {
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
  abstract get<value extends Value = Value>(key: string): Promise<value>

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
  ): Promise<value | null>

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
  ): Promise<value>
}
