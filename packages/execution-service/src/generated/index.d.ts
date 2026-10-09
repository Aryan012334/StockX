
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model MarketQuote
 * 
 */
export type MarketQuote = $Result.DefaultSelection<Prisma.$MarketQuotePayload>
/**
 * Model Wallet
 * 
 */
export type Wallet = $Result.DefaultSelection<Prisma.$WalletPayload>
/**
 * Model Holding
 * 
 */
export type Holding = $Result.DefaultSelection<Prisma.$HoldingPayload>
/**
 * Model Watchlist
 * 
 */
export type Watchlist = $Result.DefaultSelection<Prisma.$WatchlistPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model MatchExecution
 * 
 */
export type MatchExecution = $Result.DefaultSelection<Prisma.$MatchExecutionPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StockStatus: {
  ACTIVE: 'ACTIVE',
  DELISTED: 'DELISTED'
};

export type StockStatus = (typeof StockStatus)[keyof typeof StockStatus]


export const OrderSide: {
  BUY: 'BUY',
  SELL: 'SELL'
};

export type OrderSide = (typeof OrderSide)[keyof typeof OrderSide]


export const OrderType: {
  LIMIT: 'LIMIT',
  MARKET: 'MARKET'
};

export type OrderType = (typeof OrderType)[keyof typeof OrderType]


export const OrderStatus: {
  OPEN: 'OPEN',
  PARTIALLY_FILLED: 'PARTIALLY_FILLED',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const SettlementStatus: {
  SETTLED: 'SETTLED',
  FAILED: 'FAILED'
};

export type SettlementStatus = (typeof SettlementStatus)[keyof typeof SettlementStatus]


export const TransactionType: {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]


export const TransactionCategory: {
  SIGNUP_BONUS: 'SIGNUP_BONUS',
  ORDER_BUY: 'ORDER_BUY',
  ORDER_SELL: 'ORDER_SELL',
  DEPOSIT: 'DEPOSIT',
  WITHDRAWAL: 'WITHDRAWAL',
  ORDER_BUY_REFUND: 'ORDER_BUY_REFUND',
  ORDER_SELL_REFUND: 'ORDER_SELL_REFUND'
};

export type TransactionCategory = (typeof TransactionCategory)[keyof typeof TransactionCategory]

}

export type StockStatus = $Enums.StockStatus

export const StockStatus: typeof $Enums.StockStatus

export type OrderSide = $Enums.OrderSide

export const OrderSide: typeof $Enums.OrderSide

export type OrderType = $Enums.OrderType

export const OrderType: typeof $Enums.OrderType

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type SettlementStatus = $Enums.SettlementStatus

export const SettlementStatus: typeof $Enums.SettlementStatus

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

export type TransactionCategory = $Enums.TransactionCategory

export const TransactionCategory: typeof $Enums.TransactionCategory

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketQuote`: Exposes CRUD operations for the **MarketQuote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketQuotes
    * const marketQuotes = await prisma.marketQuote.findMany()
    * ```
    */
  get marketQuote(): Prisma.MarketQuoteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wallet`: Exposes CRUD operations for the **Wallet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wallets
    * const wallets = await prisma.wallet.findMany()
    * ```
    */
  get wallet(): Prisma.WalletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.holding`: Exposes CRUD operations for the **Holding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Holdings
    * const holdings = await prisma.holding.findMany()
    * ```
    */
  get holding(): Prisma.HoldingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.watchlist`: Exposes CRUD operations for the **Watchlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Watchlists
    * const watchlists = await prisma.watchlist.findMany()
    * ```
    */
  get watchlist(): Prisma.WatchlistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.matchExecution`: Exposes CRUD operations for the **MatchExecution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MatchExecutions
    * const matchExecutions = await prisma.matchExecution.findMany()
    * ```
    */
  get matchExecution(): Prisma.MatchExecutionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Account: 'Account',
    Stock: 'Stock',
    MarketQuote: 'MarketQuote',
    Wallet: 'Wallet',
    Holding: 'Holding',
    Watchlist: 'Watchlist',
    Order: 'Order',
    MatchExecution: 'MatchExecution',
    Trade: 'Trade',
    Transaction: 'Transaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "account" | "stock" | "marketQuote" | "wallet" | "holding" | "watchlist" | "order" | "matchExecution" | "trade" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      MarketQuote: {
        payload: Prisma.$MarketQuotePayload<ExtArgs>
        fields: Prisma.MarketQuoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketQuoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketQuoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          findFirst: {
            args: Prisma.MarketQuoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketQuoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          findMany: {
            args: Prisma.MarketQuoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>[]
          }
          create: {
            args: Prisma.MarketQuoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          createMany: {
            args: Prisma.MarketQuoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketQuoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>[]
          }
          delete: {
            args: Prisma.MarketQuoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          update: {
            args: Prisma.MarketQuoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          deleteMany: {
            args: Prisma.MarketQuoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketQuoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketQuoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>[]
          }
          upsert: {
            args: Prisma.MarketQuoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketQuotePayload>
          }
          aggregate: {
            args: Prisma.MarketQuoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketQuote>
          }
          groupBy: {
            args: Prisma.MarketQuoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketQuoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketQuoteCountArgs<ExtArgs>
            result: $Utils.Optional<MarketQuoteCountAggregateOutputType> | number
          }
        }
      }
      Wallet: {
        payload: Prisma.$WalletPayload<ExtArgs>
        fields: Prisma.WalletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WalletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findFirst: {
            args: Prisma.WalletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          findMany: {
            args: Prisma.WalletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          create: {
            args: Prisma.WalletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          createMany: {
            args: Prisma.WalletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          delete: {
            args: Prisma.WalletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          update: {
            args: Prisma.WalletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          deleteMany: {
            args: Prisma.WalletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WalletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>[]
          }
          upsert: {
            args: Prisma.WalletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WalletPayload>
          }
          aggregate: {
            args: Prisma.WalletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWallet>
          }
          groupBy: {
            args: Prisma.WalletGroupByArgs<ExtArgs>
            result: $Utils.Optional<WalletGroupByOutputType>[]
          }
          count: {
            args: Prisma.WalletCountArgs<ExtArgs>
            result: $Utils.Optional<WalletCountAggregateOutputType> | number
          }
        }
      }
      Holding: {
        payload: Prisma.$HoldingPayload<ExtArgs>
        fields: Prisma.HoldingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HoldingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HoldingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findFirst: {
            args: Prisma.HoldingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HoldingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          findMany: {
            args: Prisma.HoldingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          create: {
            args: Prisma.HoldingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          createMany: {
            args: Prisma.HoldingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HoldingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          delete: {
            args: Prisma.HoldingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          update: {
            args: Prisma.HoldingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          deleteMany: {
            args: Prisma.HoldingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HoldingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HoldingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>[]
          }
          upsert: {
            args: Prisma.HoldingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HoldingPayload>
          }
          aggregate: {
            args: Prisma.HoldingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHolding>
          }
          groupBy: {
            args: Prisma.HoldingGroupByArgs<ExtArgs>
            result: $Utils.Optional<HoldingGroupByOutputType>[]
          }
          count: {
            args: Prisma.HoldingCountArgs<ExtArgs>
            result: $Utils.Optional<HoldingCountAggregateOutputType> | number
          }
        }
      }
      Watchlist: {
        payload: Prisma.$WatchlistPayload<ExtArgs>
        fields: Prisma.WatchlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WatchlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WatchlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findFirst: {
            args: Prisma.WatchlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WatchlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          findMany: {
            args: Prisma.WatchlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          create: {
            args: Prisma.WatchlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          createMany: {
            args: Prisma.WatchlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WatchlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          delete: {
            args: Prisma.WatchlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          update: {
            args: Prisma.WatchlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          deleteMany: {
            args: Prisma.WatchlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WatchlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WatchlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>[]
          }
          upsert: {
            args: Prisma.WatchlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WatchlistPayload>
          }
          aggregate: {
            args: Prisma.WatchlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWatchlist>
          }
          groupBy: {
            args: Prisma.WatchlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WatchlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.WatchlistCountArgs<ExtArgs>
            result: $Utils.Optional<WatchlistCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      MatchExecution: {
        payload: Prisma.$MatchExecutionPayload<ExtArgs>
        fields: Prisma.MatchExecutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchExecutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchExecutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          findFirst: {
            args: Prisma.MatchExecutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchExecutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          findMany: {
            args: Prisma.MatchExecutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>[]
          }
          create: {
            args: Prisma.MatchExecutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          createMany: {
            args: Prisma.MatchExecutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchExecutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>[]
          }
          delete: {
            args: Prisma.MatchExecutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          update: {
            args: Prisma.MatchExecutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          deleteMany: {
            args: Prisma.MatchExecutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchExecutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchExecutionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>[]
          }
          upsert: {
            args: Prisma.MatchExecutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchExecutionPayload>
          }
          aggregate: {
            args: Prisma.MatchExecutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatchExecution>
          }
          groupBy: {
            args: Prisma.MatchExecutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchExecutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchExecutionCountArgs<ExtArgs>
            result: $Utils.Optional<MatchExecutionCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    account?: AccountOmit
    stock?: StockOmit
    marketQuote?: MarketQuoteOmit
    wallet?: WalletOmit
    holding?: HoldingOmit
    watchlist?: WatchlistOmit
    order?: OrderOmit
    matchExecution?: MatchExecutionOmit
    trade?: TradeOmit
    transaction?: TransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    orders: number
    holdings: number
    watchlist: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    holdings?: boolean | UserCountOutputTypeCountHoldingsArgs
    watchlist?: boolean | UserCountOutputTypeCountWatchlistArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWatchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }


  /**
   * Count Type StockCountOutputType
   */

  export type StockCountOutputType = {
    orders: number
    holdings: number
    watchlist: number
  }

  export type StockCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | StockCountOutputTypeCountOrdersArgs
    holdings?: boolean | StockCountOutputTypeCountHoldingsArgs
    watchlist?: boolean | StockCountOutputTypeCountWatchlistArgs
  }

  // Custom InputTypes
  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StockCountOutputType
     */
    select?: StockCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountHoldingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
  }

  /**
   * StockCountOutputType without action
   */
  export type StockCountOutputTypeCountWatchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
  }


  /**
   * Count Type WalletCountOutputType
   */

  export type WalletCountOutputType = {
    transactions: number
  }

  export type WalletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WalletCountOutputType
     */
    select?: WalletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WalletCountOutputType without action
   */
  export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    holdings?: boolean | User$holdingsArgs<ExtArgs>
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    wallet?: boolean | User$walletArgs<ExtArgs>
    orders?: boolean | User$ordersArgs<ExtArgs>
    holdings?: boolean | User$holdingsArgs<ExtArgs>
    watchlist?: boolean | User$watchlistArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      wallet: Prisma.$WalletPayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
      holdings: Prisma.$HoldingPayload<ExtArgs>[]
      watchlist: Prisma.$WatchlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      image: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    wallet<T extends User$walletArgs<ExtArgs> = {}>(args?: Subset<T, User$walletArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    holdings<T extends User$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, User$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlist<T extends User$watchlistArgs<ExtArgs> = {}>(args?: Subset<T, User$watchlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.wallet
   */
  export type User$walletArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    where?: WalletWhereInput
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.holdings
   */
  export type User$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    cursor?: HoldingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * User.watchlist
   */
  export type User$watchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockMinAggregateOutputType = {
    symbol: string | null
    companyName: string | null
    sector: string | null
    status: $Enums.StockStatus | null
    baseAsset: string | null
    quoteAsset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockMaxAggregateOutputType = {
    symbol: string | null
    companyName: string | null
    sector: string | null
    status: $Enums.StockStatus | null
    baseAsset: string | null
    quoteAsset: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StockCountAggregateOutputType = {
    symbol: number
    companyName: number
    sector: number
    status: number
    baseAsset: number
    quoteAsset: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StockMinAggregateInputType = {
    symbol?: true
    companyName?: true
    sector?: true
    status?: true
    baseAsset?: true
    quoteAsset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockMaxAggregateInputType = {
    symbol?: true
    companyName?: true
    sector?: true
    status?: true
    baseAsset?: true
    quoteAsset?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StockCountAggregateInputType = {
    symbol?: true
    companyName?: true
    sector?: true
    status?: true
    baseAsset?: true
    quoteAsset?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    symbol: string
    companyName: string
    sector: string | null
    status: $Enums.StockStatus
    baseAsset: string
    quoteAsset: string
    createdAt: Date
    updatedAt: Date
    _count: StockCountAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    companyName?: boolean
    sector?: boolean
    status?: boolean
    baseAsset?: boolean
    quoteAsset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    orders?: boolean | Stock$ordersArgs<ExtArgs>
    holdings?: boolean | Stock$holdingsArgs<ExtArgs>
    watchlist?: boolean | Stock$watchlistArgs<ExtArgs>
    quote?: boolean | Stock$quoteArgs<ExtArgs>
    _count?: boolean | StockCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    companyName?: boolean
    sector?: boolean
    status?: boolean
    baseAsset?: boolean
    quoteAsset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stock"]>

  export type StockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    companyName?: boolean
    sector?: boolean
    status?: boolean
    baseAsset?: boolean
    quoteAsset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    symbol?: boolean
    companyName?: boolean
    sector?: boolean
    status?: boolean
    baseAsset?: boolean
    quoteAsset?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"symbol" | "companyName" | "sector" | "status" | "baseAsset" | "quoteAsset" | "createdAt" | "updatedAt", ExtArgs["result"]["stock"]>
  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | Stock$ordersArgs<ExtArgs>
    holdings?: boolean | Stock$holdingsArgs<ExtArgs>
    watchlist?: boolean | Stock$watchlistArgs<ExtArgs>
    quote?: boolean | Stock$quoteArgs<ExtArgs>
    _count?: boolean | StockCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      holdings: Prisma.$HoldingPayload<ExtArgs>[]
      watchlist: Prisma.$WatchlistPayload<ExtArgs>[]
      quote: Prisma.$MarketQuotePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      symbol: string
      companyName: string
      sector: string | null
      status: $Enums.StockStatus
      baseAsset: string
      quoteAsset: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `symbol`
     * const stockWithSymbolOnly = await prisma.stock.findMany({ select: { symbol: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `symbol`
     * const stockWithSymbolOnly = await prisma.stock.createManyAndReturn({
     *   select: { symbol: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks and returns the data updated in the database.
     * @param {StockUpdateManyAndReturnArgs} args - Arguments to update many Stocks.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stocks and only return the `symbol`
     * const stockWithSymbolOnly = await prisma.stock.updateManyAndReturn({
     *   select: { symbol: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockUpdateManyAndReturnArgs>(args: SelectSubset<T, StockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orders<T extends Stock$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Stock$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    holdings<T extends Stock$holdingsArgs<ExtArgs> = {}>(args?: Subset<T, Stock$holdingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    watchlist<T extends Stock$watchlistArgs<ExtArgs> = {}>(args?: Subset<T, Stock$watchlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quote<T extends Stock$quoteArgs<ExtArgs> = {}>(args?: Subset<T, Stock$quoteArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly symbol: FieldRef<"Stock", 'String'>
    readonly companyName: FieldRef<"Stock", 'String'>
    readonly sector: FieldRef<"Stock", 'String'>
    readonly status: FieldRef<"Stock", 'StockStatus'>
    readonly baseAsset: FieldRef<"Stock", 'String'>
    readonly quoteAsset: FieldRef<"Stock", 'String'>
    readonly createdAt: FieldRef<"Stock", 'DateTime'>
    readonly updatedAt: FieldRef<"Stock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock updateManyAndReturn
   */
  export type StockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock.orders
   */
  export type Stock$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Stock.holdings
   */
  export type Stock$holdingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    cursor?: HoldingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Stock.watchlist
   */
  export type Stock$watchlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    cursor?: WatchlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Stock.quote
   */
  export type Stock$quoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    where?: MarketQuoteWhereInput
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model MarketQuote
   */

  export type AggregateMarketQuote = {
    _count: MarketQuoteCountAggregateOutputType | null
    _avg: MarketQuoteAvgAggregateOutputType | null
    _sum: MarketQuoteSumAggregateOutputType | null
    _min: MarketQuoteMinAggregateOutputType | null
    _max: MarketQuoteMaxAggregateOutputType | null
  }

  export type MarketQuoteAvgAggregateOutputType = {
    price: Decimal | null
    previousClose: Decimal | null
    open: Decimal | null
    dayHigh: Decimal | null
    dayLow: Decimal | null
    volume: Decimal | null
    change: Decimal | null
    changePercent: Decimal | null
  }

  export type MarketQuoteSumAggregateOutputType = {
    price: Decimal | null
    previousClose: Decimal | null
    open: Decimal | null
    dayHigh: Decimal | null
    dayLow: Decimal | null
    volume: Decimal | null
    change: Decimal | null
    changePercent: Decimal | null
  }

  export type MarketQuoteMinAggregateOutputType = {
    symbol: string | null
    price: Decimal | null
    previousClose: Decimal | null
    open: Decimal | null
    dayHigh: Decimal | null
    dayLow: Decimal | null
    volume: Decimal | null
    change: Decimal | null
    changePercent: Decimal | null
    isDelayed: boolean | null
    updatedAt: Date | null
  }

  export type MarketQuoteMaxAggregateOutputType = {
    symbol: string | null
    price: Decimal | null
    previousClose: Decimal | null
    open: Decimal | null
    dayHigh: Decimal | null
    dayLow: Decimal | null
    volume: Decimal | null
    change: Decimal | null
    changePercent: Decimal | null
    isDelayed: boolean | null
    updatedAt: Date | null
  }

  export type MarketQuoteCountAggregateOutputType = {
    symbol: number
    price: number
    previousClose: number
    open: number
    dayHigh: number
    dayLow: number
    volume: number
    change: number
    changePercent: number
    isDelayed: number
    updatedAt: number
    _all: number
  }


  export type MarketQuoteAvgAggregateInputType = {
    price?: true
    previousClose?: true
    open?: true
    dayHigh?: true
    dayLow?: true
    volume?: true
    change?: true
    changePercent?: true
  }

  export type MarketQuoteSumAggregateInputType = {
    price?: true
    previousClose?: true
    open?: true
    dayHigh?: true
    dayLow?: true
    volume?: true
    change?: true
    changePercent?: true
  }

  export type MarketQuoteMinAggregateInputType = {
    symbol?: true
    price?: true
    previousClose?: true
    open?: true
    dayHigh?: true
    dayLow?: true
    volume?: true
    change?: true
    changePercent?: true
    isDelayed?: true
    updatedAt?: true
  }

  export type MarketQuoteMaxAggregateInputType = {
    symbol?: true
    price?: true
    previousClose?: true
    open?: true
    dayHigh?: true
    dayLow?: true
    volume?: true
    change?: true
    changePercent?: true
    isDelayed?: true
    updatedAt?: true
  }

  export type MarketQuoteCountAggregateInputType = {
    symbol?: true
    price?: true
    previousClose?: true
    open?: true
    dayHigh?: true
    dayLow?: true
    volume?: true
    change?: true
    changePercent?: true
    isDelayed?: true
    updatedAt?: true
    _all?: true
  }

  export type MarketQuoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketQuote to aggregate.
     */
    where?: MarketQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketQuotes to fetch.
     */
    orderBy?: MarketQuoteOrderByWithRelationInput | MarketQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketQuotes
    **/
    _count?: true | MarketQuoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketQuoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketQuoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketQuoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketQuoteMaxAggregateInputType
  }

  export type GetMarketQuoteAggregateType<T extends MarketQuoteAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketQuote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketQuote[P]>
      : GetScalarType<T[P], AggregateMarketQuote[P]>
  }




  export type MarketQuoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketQuoteWhereInput
    orderBy?: MarketQuoteOrderByWithAggregationInput | MarketQuoteOrderByWithAggregationInput[]
    by: MarketQuoteScalarFieldEnum[] | MarketQuoteScalarFieldEnum
    having?: MarketQuoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketQuoteCountAggregateInputType | true
    _avg?: MarketQuoteAvgAggregateInputType
    _sum?: MarketQuoteSumAggregateInputType
    _min?: MarketQuoteMinAggregateInputType
    _max?: MarketQuoteMaxAggregateInputType
  }

  export type MarketQuoteGroupByOutputType = {
    symbol: string
    price: Decimal
    previousClose: Decimal
    open: Decimal
    dayHigh: Decimal
    dayLow: Decimal
    volume: Decimal
    change: Decimal
    changePercent: Decimal
    isDelayed: boolean
    updatedAt: Date
    _count: MarketQuoteCountAggregateOutputType | null
    _avg: MarketQuoteAvgAggregateOutputType | null
    _sum: MarketQuoteSumAggregateOutputType | null
    _min: MarketQuoteMinAggregateOutputType | null
    _max: MarketQuoteMaxAggregateOutputType | null
  }

  type GetMarketQuoteGroupByPayload<T extends MarketQuoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketQuoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketQuoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketQuoteGroupByOutputType[P]>
            : GetScalarType<T[P], MarketQuoteGroupByOutputType[P]>
        }
      >
    >


  export type MarketQuoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    price?: boolean
    previousClose?: boolean
    open?: boolean
    dayHigh?: boolean
    dayLow?: boolean
    volume?: boolean
    change?: boolean
    changePercent?: boolean
    isDelayed?: boolean
    updatedAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketQuote"]>

  export type MarketQuoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    price?: boolean
    previousClose?: boolean
    open?: boolean
    dayHigh?: boolean
    dayLow?: boolean
    volume?: boolean
    change?: boolean
    changePercent?: boolean
    isDelayed?: boolean
    updatedAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketQuote"]>

  export type MarketQuoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    symbol?: boolean
    price?: boolean
    previousClose?: boolean
    open?: boolean
    dayHigh?: boolean
    dayLow?: boolean
    volume?: boolean
    change?: boolean
    changePercent?: boolean
    isDelayed?: boolean
    updatedAt?: boolean
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketQuote"]>

  export type MarketQuoteSelectScalar = {
    symbol?: boolean
    price?: boolean
    previousClose?: boolean
    open?: boolean
    dayHigh?: boolean
    dayLow?: boolean
    volume?: boolean
    change?: boolean
    changePercent?: boolean
    isDelayed?: boolean
    updatedAt?: boolean
  }

  export type MarketQuoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"symbol" | "price" | "previousClose" | "open" | "dayHigh" | "dayLow" | "volume" | "change" | "changePercent" | "isDelayed" | "updatedAt", ExtArgs["result"]["marketQuote"]>
  export type MarketQuoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type MarketQuoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type MarketQuoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $MarketQuotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketQuote"
    objects: {
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      symbol: string
      price: Prisma.Decimal
      previousClose: Prisma.Decimal
      open: Prisma.Decimal
      dayHigh: Prisma.Decimal
      dayLow: Prisma.Decimal
      volume: Prisma.Decimal
      change: Prisma.Decimal
      changePercent: Prisma.Decimal
      isDelayed: boolean
      updatedAt: Date
    }, ExtArgs["result"]["marketQuote"]>
    composites: {}
  }

  type MarketQuoteGetPayload<S extends boolean | null | undefined | MarketQuoteDefaultArgs> = $Result.GetResult<Prisma.$MarketQuotePayload, S>

  type MarketQuoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketQuoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketQuoteCountAggregateInputType | true
    }

  export interface MarketQuoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketQuote'], meta: { name: 'MarketQuote' } }
    /**
     * Find zero or one MarketQuote that matches the filter.
     * @param {MarketQuoteFindUniqueArgs} args - Arguments to find a MarketQuote
     * @example
     * // Get one MarketQuote
     * const marketQuote = await prisma.marketQuote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketQuoteFindUniqueArgs>(args: SelectSubset<T, MarketQuoteFindUniqueArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketQuote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketQuoteFindUniqueOrThrowArgs} args - Arguments to find a MarketQuote
     * @example
     * // Get one MarketQuote
     * const marketQuote = await prisma.marketQuote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketQuoteFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketQuoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketQuote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteFindFirstArgs} args - Arguments to find a MarketQuote
     * @example
     * // Get one MarketQuote
     * const marketQuote = await prisma.marketQuote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketQuoteFindFirstArgs>(args?: SelectSubset<T, MarketQuoteFindFirstArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketQuote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteFindFirstOrThrowArgs} args - Arguments to find a MarketQuote
     * @example
     * // Get one MarketQuote
     * const marketQuote = await prisma.marketQuote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketQuoteFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketQuoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketQuotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketQuotes
     * const marketQuotes = await prisma.marketQuote.findMany()
     * 
     * // Get first 10 MarketQuotes
     * const marketQuotes = await prisma.marketQuote.findMany({ take: 10 })
     * 
     * // Only select the `symbol`
     * const marketQuoteWithSymbolOnly = await prisma.marketQuote.findMany({ select: { symbol: true } })
     * 
     */
    findMany<T extends MarketQuoteFindManyArgs>(args?: SelectSubset<T, MarketQuoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketQuote.
     * @param {MarketQuoteCreateArgs} args - Arguments to create a MarketQuote.
     * @example
     * // Create one MarketQuote
     * const MarketQuote = await prisma.marketQuote.create({
     *   data: {
     *     // ... data to create a MarketQuote
     *   }
     * })
     * 
     */
    create<T extends MarketQuoteCreateArgs>(args: SelectSubset<T, MarketQuoteCreateArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketQuotes.
     * @param {MarketQuoteCreateManyArgs} args - Arguments to create many MarketQuotes.
     * @example
     * // Create many MarketQuotes
     * const marketQuote = await prisma.marketQuote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketQuoteCreateManyArgs>(args?: SelectSubset<T, MarketQuoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarketQuotes and returns the data saved in the database.
     * @param {MarketQuoteCreateManyAndReturnArgs} args - Arguments to create many MarketQuotes.
     * @example
     * // Create many MarketQuotes
     * const marketQuote = await prisma.marketQuote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarketQuotes and only return the `symbol`
     * const marketQuoteWithSymbolOnly = await prisma.marketQuote.createManyAndReturn({
     *   select: { symbol: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketQuoteCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketQuoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MarketQuote.
     * @param {MarketQuoteDeleteArgs} args - Arguments to delete one MarketQuote.
     * @example
     * // Delete one MarketQuote
     * const MarketQuote = await prisma.marketQuote.delete({
     *   where: {
     *     // ... filter to delete one MarketQuote
     *   }
     * })
     * 
     */
    delete<T extends MarketQuoteDeleteArgs>(args: SelectSubset<T, MarketQuoteDeleteArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketQuote.
     * @param {MarketQuoteUpdateArgs} args - Arguments to update one MarketQuote.
     * @example
     * // Update one MarketQuote
     * const marketQuote = await prisma.marketQuote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketQuoteUpdateArgs>(args: SelectSubset<T, MarketQuoteUpdateArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketQuotes.
     * @param {MarketQuoteDeleteManyArgs} args - Arguments to filter MarketQuotes to delete.
     * @example
     * // Delete a few MarketQuotes
     * const { count } = await prisma.marketQuote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketQuoteDeleteManyArgs>(args?: SelectSubset<T, MarketQuoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketQuotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketQuotes
     * const marketQuote = await prisma.marketQuote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketQuoteUpdateManyArgs>(args: SelectSubset<T, MarketQuoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketQuotes and returns the data updated in the database.
     * @param {MarketQuoteUpdateManyAndReturnArgs} args - Arguments to update many MarketQuotes.
     * @example
     * // Update many MarketQuotes
     * const marketQuote = await prisma.marketQuote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MarketQuotes and only return the `symbol`
     * const marketQuoteWithSymbolOnly = await prisma.marketQuote.updateManyAndReturn({
     *   select: { symbol: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketQuoteUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketQuoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MarketQuote.
     * @param {MarketQuoteUpsertArgs} args - Arguments to update or create a MarketQuote.
     * @example
     * // Update or create a MarketQuote
     * const marketQuote = await prisma.marketQuote.upsert({
     *   create: {
     *     // ... data to create a MarketQuote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketQuote we want to update
     *   }
     * })
     */
    upsert<T extends MarketQuoteUpsertArgs>(args: SelectSubset<T, MarketQuoteUpsertArgs<ExtArgs>>): Prisma__MarketQuoteClient<$Result.GetResult<Prisma.$MarketQuotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketQuotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteCountArgs} args - Arguments to filter MarketQuotes to count.
     * @example
     * // Count the number of MarketQuotes
     * const count = await prisma.marketQuote.count({
     *   where: {
     *     // ... the filter for the MarketQuotes we want to count
     *   }
     * })
    **/
    count<T extends MarketQuoteCountArgs>(
      args?: Subset<T, MarketQuoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketQuoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketQuote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketQuoteAggregateArgs>(args: Subset<T, MarketQuoteAggregateArgs>): Prisma.PrismaPromise<GetMarketQuoteAggregateType<T>>

    /**
     * Group by MarketQuote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketQuoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketQuoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketQuoteGroupByArgs['orderBy'] }
        : { orderBy?: MarketQuoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketQuoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketQuoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketQuote model
   */
  readonly fields: MarketQuoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketQuote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketQuoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarketQuote model
   */
  interface MarketQuoteFieldRefs {
    readonly symbol: FieldRef<"MarketQuote", 'String'>
    readonly price: FieldRef<"MarketQuote", 'Decimal'>
    readonly previousClose: FieldRef<"MarketQuote", 'Decimal'>
    readonly open: FieldRef<"MarketQuote", 'Decimal'>
    readonly dayHigh: FieldRef<"MarketQuote", 'Decimal'>
    readonly dayLow: FieldRef<"MarketQuote", 'Decimal'>
    readonly volume: FieldRef<"MarketQuote", 'Decimal'>
    readonly change: FieldRef<"MarketQuote", 'Decimal'>
    readonly changePercent: FieldRef<"MarketQuote", 'Decimal'>
    readonly isDelayed: FieldRef<"MarketQuote", 'Boolean'>
    readonly updatedAt: FieldRef<"MarketQuote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MarketQuote findUnique
   */
  export type MarketQuoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter, which MarketQuote to fetch.
     */
    where: MarketQuoteWhereUniqueInput
  }

  /**
   * MarketQuote findUniqueOrThrow
   */
  export type MarketQuoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter, which MarketQuote to fetch.
     */
    where: MarketQuoteWhereUniqueInput
  }

  /**
   * MarketQuote findFirst
   */
  export type MarketQuoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter, which MarketQuote to fetch.
     */
    where?: MarketQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketQuotes to fetch.
     */
    orderBy?: MarketQuoteOrderByWithRelationInput | MarketQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketQuotes.
     */
    cursor?: MarketQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketQuotes.
     */
    distinct?: MarketQuoteScalarFieldEnum | MarketQuoteScalarFieldEnum[]
  }

  /**
   * MarketQuote findFirstOrThrow
   */
  export type MarketQuoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter, which MarketQuote to fetch.
     */
    where?: MarketQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketQuotes to fetch.
     */
    orderBy?: MarketQuoteOrderByWithRelationInput | MarketQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketQuotes.
     */
    cursor?: MarketQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketQuotes.
     */
    distinct?: MarketQuoteScalarFieldEnum | MarketQuoteScalarFieldEnum[]
  }

  /**
   * MarketQuote findMany
   */
  export type MarketQuoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter, which MarketQuotes to fetch.
     */
    where?: MarketQuoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketQuotes to fetch.
     */
    orderBy?: MarketQuoteOrderByWithRelationInput | MarketQuoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketQuotes.
     */
    cursor?: MarketQuoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketQuotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketQuotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketQuotes.
     */
    distinct?: MarketQuoteScalarFieldEnum | MarketQuoteScalarFieldEnum[]
  }

  /**
   * MarketQuote create
   */
  export type MarketQuoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * The data needed to create a MarketQuote.
     */
    data: XOR<MarketQuoteCreateInput, MarketQuoteUncheckedCreateInput>
  }

  /**
   * MarketQuote createMany
   */
  export type MarketQuoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketQuotes.
     */
    data: MarketQuoteCreateManyInput | MarketQuoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketQuote createManyAndReturn
   */
  export type MarketQuoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * The data used to create many MarketQuotes.
     */
    data: MarketQuoteCreateManyInput | MarketQuoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MarketQuote update
   */
  export type MarketQuoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * The data needed to update a MarketQuote.
     */
    data: XOR<MarketQuoteUpdateInput, MarketQuoteUncheckedUpdateInput>
    /**
     * Choose, which MarketQuote to update.
     */
    where: MarketQuoteWhereUniqueInput
  }

  /**
   * MarketQuote updateMany
   */
  export type MarketQuoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketQuotes.
     */
    data: XOR<MarketQuoteUpdateManyMutationInput, MarketQuoteUncheckedUpdateManyInput>
    /**
     * Filter which MarketQuotes to update
     */
    where?: MarketQuoteWhereInput
    /**
     * Limit how many MarketQuotes to update.
     */
    limit?: number
  }

  /**
   * MarketQuote updateManyAndReturn
   */
  export type MarketQuoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * The data used to update MarketQuotes.
     */
    data: XOR<MarketQuoteUpdateManyMutationInput, MarketQuoteUncheckedUpdateManyInput>
    /**
     * Filter which MarketQuotes to update
     */
    where?: MarketQuoteWhereInput
    /**
     * Limit how many MarketQuotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MarketQuote upsert
   */
  export type MarketQuoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * The filter to search for the MarketQuote to update in case it exists.
     */
    where: MarketQuoteWhereUniqueInput
    /**
     * In case the MarketQuote found by the `where` argument doesn't exist, create a new MarketQuote with this data.
     */
    create: XOR<MarketQuoteCreateInput, MarketQuoteUncheckedCreateInput>
    /**
     * In case the MarketQuote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketQuoteUpdateInput, MarketQuoteUncheckedUpdateInput>
  }

  /**
   * MarketQuote delete
   */
  export type MarketQuoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
    /**
     * Filter which MarketQuote to delete.
     */
    where: MarketQuoteWhereUniqueInput
  }

  /**
   * MarketQuote deleteMany
   */
  export type MarketQuoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketQuotes to delete
     */
    where?: MarketQuoteWhereInput
    /**
     * Limit how many MarketQuotes to delete.
     */
    limit?: number
  }

  /**
   * MarketQuote without action
   */
  export type MarketQuoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketQuote
     */
    select?: MarketQuoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketQuote
     */
    omit?: MarketQuoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketQuoteInclude<ExtArgs> | null
  }


  /**
   * Model Wallet
   */

  export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  export type WalletAvgAggregateOutputType = {
    balance: Decimal | null
    lockedBalance: Decimal | null
  }

  export type WalletSumAggregateOutputType = {
    balance: Decimal | null
    lockedBalance: Decimal | null
  }

  export type WalletMinAggregateOutputType = {
    userId: string | null
    balance: Decimal | null
    lockedBalance: Decimal | null
    updatedAt: Date | null
  }

  export type WalletMaxAggregateOutputType = {
    userId: string | null
    balance: Decimal | null
    lockedBalance: Decimal | null
    updatedAt: Date | null
  }

  export type WalletCountAggregateOutputType = {
    userId: number
    balance: number
    lockedBalance: number
    assetsHeld: number
    updatedAt: number
    _all: number
  }


  export type WalletAvgAggregateInputType = {
    balance?: true
    lockedBalance?: true
  }

  export type WalletSumAggregateInputType = {
    balance?: true
    lockedBalance?: true
  }

  export type WalletMinAggregateInputType = {
    userId?: true
    balance?: true
    lockedBalance?: true
    updatedAt?: true
  }

  export type WalletMaxAggregateInputType = {
    userId?: true
    balance?: true
    lockedBalance?: true
    updatedAt?: true
  }

  export type WalletCountAggregateInputType = {
    userId?: true
    balance?: true
    lockedBalance?: true
    assetsHeld?: true
    updatedAt?: true
    _all?: true
  }

  export type WalletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallet to aggregate.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wallets
    **/
    _count?: true | WalletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WalletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WalletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WalletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WalletMaxAggregateInputType
  }

  export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
        [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWallet[P]>
      : GetScalarType<T[P], AggregateWallet[P]>
  }




  export type WalletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WalletWhereInput
    orderBy?: WalletOrderByWithAggregationInput | WalletOrderByWithAggregationInput[]
    by: WalletScalarFieldEnum[] | WalletScalarFieldEnum
    having?: WalletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WalletCountAggregateInputType | true
    _avg?: WalletAvgAggregateInputType
    _sum?: WalletSumAggregateInputType
    _min?: WalletMinAggregateInputType
    _max?: WalletMaxAggregateInputType
  }

  export type WalletGroupByOutputType = {
    userId: string
    balance: Decimal
    lockedBalance: Decimal
    assetsHeld: JsonValue
    updatedAt: Date | null
    _count: WalletCountAggregateOutputType | null
    _avg: WalletAvgAggregateOutputType | null
    _sum: WalletSumAggregateOutputType | null
    _min: WalletMinAggregateOutputType | null
    _max: WalletMaxAggregateOutputType | null
  }

  type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WalletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WalletGroupByOutputType[P]>
            : GetScalarType<T[P], WalletGroupByOutputType[P]>
        }
      >
    >


  export type WalletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balance?: boolean
    lockedBalance?: boolean
    assetsHeld?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balance?: boolean
    lockedBalance?: boolean
    assetsHeld?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    balance?: boolean
    lockedBalance?: boolean
    assetsHeld?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wallet"]>

  export type WalletSelectScalar = {
    userId?: boolean
    balance?: boolean
    lockedBalance?: boolean
    assetsHeld?: boolean
    updatedAt?: boolean
  }

  export type WalletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "balance" | "lockedBalance" | "assetsHeld" | "updatedAt", ExtArgs["result"]["wallet"]>
  export type WalletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    transactions?: boolean | Wallet$transactionsArgs<ExtArgs>
    _count?: boolean | WalletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WalletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WalletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WalletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wallet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      balance: Prisma.Decimal
      lockedBalance: Prisma.Decimal
      assetsHeld: Prisma.JsonValue
      updatedAt: Date | null
    }, ExtArgs["result"]["wallet"]>
    composites: {}
  }

  type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = $Result.GetResult<Prisma.$WalletPayload, S>

  type WalletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WalletCountAggregateInputType | true
    }

  export interface WalletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wallet'], meta: { name: 'Wallet' } }
    /**
     * Find zero or one Wallet that matches the filter.
     * @param {WalletFindUniqueArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WalletFindUniqueArgs>(args: SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Wallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WalletFindUniqueOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WalletFindFirstArgs>(args?: SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Wallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindFirstOrThrowArgs} args - Arguments to find a Wallet
     * @example
     * // Get one Wallet
     * const wallet = await prisma.wallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Wallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wallets
     * const wallets = await prisma.wallet.findMany()
     * 
     * // Get first 10 Wallets
     * const wallets = await prisma.wallet.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const walletWithUserIdOnly = await prisma.wallet.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends WalletFindManyArgs>(args?: SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Wallet.
     * @param {WalletCreateArgs} args - Arguments to create a Wallet.
     * @example
     * // Create one Wallet
     * const Wallet = await prisma.wallet.create({
     *   data: {
     *     // ... data to create a Wallet
     *   }
     * })
     * 
     */
    create<T extends WalletCreateArgs>(args: SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Wallets.
     * @param {WalletCreateManyArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WalletCreateManyArgs>(args?: SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Wallets and returns the data saved in the database.
     * @param {WalletCreateManyAndReturnArgs} args - Arguments to create many Wallets.
     * @example
     * // Create many Wallets
     * const wallet = await prisma.wallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Wallets and only return the `userId`
     * const walletWithUserIdOnly = await prisma.wallet.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Wallet.
     * @param {WalletDeleteArgs} args - Arguments to delete one Wallet.
     * @example
     * // Delete one Wallet
     * const Wallet = await prisma.wallet.delete({
     *   where: {
     *     // ... filter to delete one Wallet
     *   }
     * })
     * 
     */
    delete<T extends WalletDeleteArgs>(args: SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Wallet.
     * @param {WalletUpdateArgs} args - Arguments to update one Wallet.
     * @example
     * // Update one Wallet
     * const wallet = await prisma.wallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WalletUpdateArgs>(args: SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Wallets.
     * @param {WalletDeleteManyArgs} args - Arguments to filter Wallets to delete.
     * @example
     * // Delete a few Wallets
     * const { count } = await prisma.wallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WalletDeleteManyArgs>(args?: SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WalletUpdateManyArgs>(args: SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wallets and returns the data updated in the database.
     * @param {WalletUpdateManyAndReturnArgs} args - Arguments to update many Wallets.
     * @example
     * // Update many Wallets
     * const wallet = await prisma.wallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Wallets and only return the `userId`
     * const walletWithUserIdOnly = await prisma.wallet.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Wallet.
     * @param {WalletUpsertArgs} args - Arguments to update or create a Wallet.
     * @example
     * // Update or create a Wallet
     * const wallet = await prisma.wallet.upsert({
     *   create: {
     *     // ... data to create a Wallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wallet we want to update
     *   }
     * })
     */
    upsert<T extends WalletUpsertArgs>(args: SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Wallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletCountArgs} args - Arguments to filter Wallets to count.
     * @example
     * // Count the number of Wallets
     * const count = await prisma.wallet.count({
     *   where: {
     *     // ... the filter for the Wallets we want to count
     *   }
     * })
    **/
    count<T extends WalletCountArgs>(
      args?: Subset<T, WalletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WalletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WalletAggregateArgs>(args: Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>

    /**
     * Group by Wallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WalletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WalletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WalletGroupByArgs['orderBy'] }
        : { orderBy?: WalletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wallet model
   */
  readonly fields: WalletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wallet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WalletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Wallet$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wallet model
   */
  interface WalletFieldRefs {
    readonly userId: FieldRef<"Wallet", 'String'>
    readonly balance: FieldRef<"Wallet", 'Decimal'>
    readonly lockedBalance: FieldRef<"Wallet", 'Decimal'>
    readonly assetsHeld: FieldRef<"Wallet", 'Json'>
    readonly updatedAt: FieldRef<"Wallet", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wallet findUnique
   */
  export type WalletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findUniqueOrThrow
   */
  export type WalletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet findFirst
   */
  export type WalletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findFirstOrThrow
   */
  export type WalletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallet to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet findMany
   */
  export type WalletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter, which Wallets to fetch.
     */
    where?: WalletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wallets to fetch.
     */
    orderBy?: WalletOrderByWithRelationInput | WalletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wallets.
     */
    cursor?: WalletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wallets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wallets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wallets.
     */
    distinct?: WalletScalarFieldEnum | WalletScalarFieldEnum[]
  }

  /**
   * Wallet create
   */
  export type WalletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to create a Wallet.
     */
    data: XOR<WalletCreateInput, WalletUncheckedCreateInput>
  }

  /**
   * Wallet createMany
   */
  export type WalletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Wallet createManyAndReturn
   */
  export type WalletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to create many Wallets.
     */
    data: WalletCreateManyInput | WalletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet update
   */
  export type WalletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The data needed to update a Wallet.
     */
    data: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
    /**
     * Choose, which Wallet to update.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet updateMany
   */
  export type WalletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
  }

  /**
   * Wallet updateManyAndReturn
   */
  export type WalletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * The data used to update Wallets.
     */
    data: XOR<WalletUpdateManyMutationInput, WalletUncheckedUpdateManyInput>
    /**
     * Filter which Wallets to update
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Wallet upsert
   */
  export type WalletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * The filter to search for the Wallet to update in case it exists.
     */
    where: WalletWhereUniqueInput
    /**
     * In case the Wallet found by the `where` argument doesn't exist, create a new Wallet with this data.
     */
    create: XOR<WalletCreateInput, WalletUncheckedCreateInput>
    /**
     * In case the Wallet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WalletUpdateInput, WalletUncheckedUpdateInput>
  }

  /**
   * Wallet delete
   */
  export type WalletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
    /**
     * Filter which Wallet to delete.
     */
    where: WalletWhereUniqueInput
  }

  /**
   * Wallet deleteMany
   */
  export type WalletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wallets to delete
     */
    where?: WalletWhereInput
    /**
     * Limit how many Wallets to delete.
     */
    limit?: number
  }

  /**
   * Wallet.transactions
   */
  export type Wallet$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Wallet without action
   */
  export type WalletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wallet
     */
    select?: WalletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Wallet
     */
    omit?: WalletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WalletInclude<ExtArgs> | null
  }


  /**
   * Model Holding
   */

  export type AggregateHolding = {
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  export type HoldingAvgAggregateOutputType = {
    quantity: Decimal | null
    lockedQuantity: Decimal | null
    averageCost: Decimal | null
    realizedPnl: Decimal | null
  }

  export type HoldingSumAggregateOutputType = {
    quantity: Decimal | null
    lockedQuantity: Decimal | null
    averageCost: Decimal | null
    realizedPnl: Decimal | null
  }

  export type HoldingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    quantity: Decimal | null
    lockedQuantity: Decimal | null
    averageCost: Decimal | null
    realizedPnl: Decimal | null
    updatedAt: Date | null
  }

  export type HoldingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    quantity: Decimal | null
    lockedQuantity: Decimal | null
    averageCost: Decimal | null
    realizedPnl: Decimal | null
    updatedAt: Date | null
  }

  export type HoldingCountAggregateOutputType = {
    id: number
    userId: number
    symbol: number
    quantity: number
    lockedQuantity: number
    averageCost: number
    realizedPnl: number
    updatedAt: number
    _all: number
  }


  export type HoldingAvgAggregateInputType = {
    quantity?: true
    lockedQuantity?: true
    averageCost?: true
    realizedPnl?: true
  }

  export type HoldingSumAggregateInputType = {
    quantity?: true
    lockedQuantity?: true
    averageCost?: true
    realizedPnl?: true
  }

  export type HoldingMinAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    quantity?: true
    lockedQuantity?: true
    averageCost?: true
    realizedPnl?: true
    updatedAt?: true
  }

  export type HoldingMaxAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    quantity?: true
    lockedQuantity?: true
    averageCost?: true
    realizedPnl?: true
    updatedAt?: true
  }

  export type HoldingCountAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    quantity?: true
    lockedQuantity?: true
    averageCost?: true
    realizedPnl?: true
    updatedAt?: true
    _all?: true
  }

  export type HoldingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holding to aggregate.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Holdings
    **/
    _count?: true | HoldingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HoldingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HoldingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HoldingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HoldingMaxAggregateInputType
  }

  export type GetHoldingAggregateType<T extends HoldingAggregateArgs> = {
        [P in keyof T & keyof AggregateHolding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHolding[P]>
      : GetScalarType<T[P], AggregateHolding[P]>
  }




  export type HoldingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HoldingWhereInput
    orderBy?: HoldingOrderByWithAggregationInput | HoldingOrderByWithAggregationInput[]
    by: HoldingScalarFieldEnum[] | HoldingScalarFieldEnum
    having?: HoldingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HoldingCountAggregateInputType | true
    _avg?: HoldingAvgAggregateInputType
    _sum?: HoldingSumAggregateInputType
    _min?: HoldingMinAggregateInputType
    _max?: HoldingMaxAggregateInputType
  }

  export type HoldingGroupByOutputType = {
    id: string
    userId: string
    symbol: string
    quantity: Decimal
    lockedQuantity: Decimal
    averageCost: Decimal
    realizedPnl: Decimal
    updatedAt: Date
    _count: HoldingCountAggregateOutputType | null
    _avg: HoldingAvgAggregateOutputType | null
    _sum: HoldingSumAggregateOutputType | null
    _min: HoldingMinAggregateOutputType | null
    _max: HoldingMaxAggregateOutputType | null
  }

  type GetHoldingGroupByPayload<T extends HoldingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HoldingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HoldingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HoldingGroupByOutputType[P]>
            : GetScalarType<T[P], HoldingGroupByOutputType[P]>
        }
      >
    >


  export type HoldingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    quantity?: boolean
    lockedQuantity?: boolean
    averageCost?: boolean
    realizedPnl?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    quantity?: boolean
    lockedQuantity?: boolean
    averageCost?: boolean
    realizedPnl?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    quantity?: boolean
    lockedQuantity?: boolean
    averageCost?: boolean
    realizedPnl?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["holding"]>

  export type HoldingSelectScalar = {
    id?: boolean
    userId?: boolean
    symbol?: boolean
    quantity?: boolean
    lockedQuantity?: boolean
    averageCost?: boolean
    realizedPnl?: boolean
    updatedAt?: boolean
  }

  export type HoldingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "symbol" | "quantity" | "lockedQuantity" | "averageCost" | "realizedPnl" | "updatedAt", ExtArgs["result"]["holding"]>
  export type HoldingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type HoldingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type HoldingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $HoldingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Holding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      symbol: string
      quantity: Prisma.Decimal
      lockedQuantity: Prisma.Decimal
      averageCost: Prisma.Decimal
      realizedPnl: Prisma.Decimal
      updatedAt: Date
    }, ExtArgs["result"]["holding"]>
    composites: {}
  }

  type HoldingGetPayload<S extends boolean | null | undefined | HoldingDefaultArgs> = $Result.GetResult<Prisma.$HoldingPayload, S>

  type HoldingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HoldingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HoldingCountAggregateInputType | true
    }

  export interface HoldingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Holding'], meta: { name: 'Holding' } }
    /**
     * Find zero or one Holding that matches the filter.
     * @param {HoldingFindUniqueArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HoldingFindUniqueArgs>(args: SelectSubset<T, HoldingFindUniqueArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Holding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HoldingFindUniqueOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HoldingFindUniqueOrThrowArgs>(args: SelectSubset<T, HoldingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HoldingFindFirstArgs>(args?: SelectSubset<T, HoldingFindFirstArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Holding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindFirstOrThrowArgs} args - Arguments to find a Holding
     * @example
     * // Get one Holding
     * const holding = await prisma.holding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HoldingFindFirstOrThrowArgs>(args?: SelectSubset<T, HoldingFindFirstOrThrowArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Holdings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Holdings
     * const holdings = await prisma.holding.findMany()
     * 
     * // Get first 10 Holdings
     * const holdings = await prisma.holding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const holdingWithIdOnly = await prisma.holding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HoldingFindManyArgs>(args?: SelectSubset<T, HoldingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Holding.
     * @param {HoldingCreateArgs} args - Arguments to create a Holding.
     * @example
     * // Create one Holding
     * const Holding = await prisma.holding.create({
     *   data: {
     *     // ... data to create a Holding
     *   }
     * })
     * 
     */
    create<T extends HoldingCreateArgs>(args: SelectSubset<T, HoldingCreateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Holdings.
     * @param {HoldingCreateManyArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HoldingCreateManyArgs>(args?: SelectSubset<T, HoldingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Holdings and returns the data saved in the database.
     * @param {HoldingCreateManyAndReturnArgs} args - Arguments to create many Holdings.
     * @example
     * // Create many Holdings
     * const holding = await prisma.holding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HoldingCreateManyAndReturnArgs>(args?: SelectSubset<T, HoldingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Holding.
     * @param {HoldingDeleteArgs} args - Arguments to delete one Holding.
     * @example
     * // Delete one Holding
     * const Holding = await prisma.holding.delete({
     *   where: {
     *     // ... filter to delete one Holding
     *   }
     * })
     * 
     */
    delete<T extends HoldingDeleteArgs>(args: SelectSubset<T, HoldingDeleteArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Holding.
     * @param {HoldingUpdateArgs} args - Arguments to update one Holding.
     * @example
     * // Update one Holding
     * const holding = await prisma.holding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HoldingUpdateArgs>(args: SelectSubset<T, HoldingUpdateArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Holdings.
     * @param {HoldingDeleteManyArgs} args - Arguments to filter Holdings to delete.
     * @example
     * // Delete a few Holdings
     * const { count } = await prisma.holding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HoldingDeleteManyArgs>(args?: SelectSubset<T, HoldingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HoldingUpdateManyArgs>(args: SelectSubset<T, HoldingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Holdings and returns the data updated in the database.
     * @param {HoldingUpdateManyAndReturnArgs} args - Arguments to update many Holdings.
     * @example
     * // Update many Holdings
     * const holding = await prisma.holding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Holdings and only return the `id`
     * const holdingWithIdOnly = await prisma.holding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HoldingUpdateManyAndReturnArgs>(args: SelectSubset<T, HoldingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Holding.
     * @param {HoldingUpsertArgs} args - Arguments to update or create a Holding.
     * @example
     * // Update or create a Holding
     * const holding = await prisma.holding.upsert({
     *   create: {
     *     // ... data to create a Holding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Holding we want to update
     *   }
     * })
     */
    upsert<T extends HoldingUpsertArgs>(args: SelectSubset<T, HoldingUpsertArgs<ExtArgs>>): Prisma__HoldingClient<$Result.GetResult<Prisma.$HoldingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Holdings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingCountArgs} args - Arguments to filter Holdings to count.
     * @example
     * // Count the number of Holdings
     * const count = await prisma.holding.count({
     *   where: {
     *     // ... the filter for the Holdings we want to count
     *   }
     * })
    **/
    count<T extends HoldingCountArgs>(
      args?: Subset<T, HoldingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HoldingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HoldingAggregateArgs>(args: Subset<T, HoldingAggregateArgs>): Prisma.PrismaPromise<GetHoldingAggregateType<T>>

    /**
     * Group by Holding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HoldingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HoldingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HoldingGroupByArgs['orderBy'] }
        : { orderBy?: HoldingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HoldingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHoldingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Holding model
   */
  readonly fields: HoldingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Holding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HoldingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Holding model
   */
  interface HoldingFieldRefs {
    readonly id: FieldRef<"Holding", 'String'>
    readonly userId: FieldRef<"Holding", 'String'>
    readonly symbol: FieldRef<"Holding", 'String'>
    readonly quantity: FieldRef<"Holding", 'Decimal'>
    readonly lockedQuantity: FieldRef<"Holding", 'Decimal'>
    readonly averageCost: FieldRef<"Holding", 'Decimal'>
    readonly realizedPnl: FieldRef<"Holding", 'Decimal'>
    readonly updatedAt: FieldRef<"Holding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Holding findUnique
   */
  export type HoldingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findUniqueOrThrow
   */
  export type HoldingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding findFirst
   */
  export type HoldingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findFirstOrThrow
   */
  export type HoldingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holding to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding findMany
   */
  export type HoldingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter, which Holdings to fetch.
     */
    where?: HoldingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Holdings to fetch.
     */
    orderBy?: HoldingOrderByWithRelationInput | HoldingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Holdings.
     */
    cursor?: HoldingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Holdings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Holdings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Holdings.
     */
    distinct?: HoldingScalarFieldEnum | HoldingScalarFieldEnum[]
  }

  /**
   * Holding create
   */
  export type HoldingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to create a Holding.
     */
    data: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
  }

  /**
   * Holding createMany
   */
  export type HoldingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Holding createManyAndReturn
   */
  export type HoldingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * The data used to create many Holdings.
     */
    data: HoldingCreateManyInput | HoldingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holding update
   */
  export type HoldingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The data needed to update a Holding.
     */
    data: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
    /**
     * Choose, which Holding to update.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding updateMany
   */
  export type HoldingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
  }

  /**
   * Holding updateManyAndReturn
   */
  export type HoldingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * The data used to update Holdings.
     */
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyInput>
    /**
     * Filter which Holdings to update
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Holding upsert
   */
  export type HoldingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * The filter to search for the Holding to update in case it exists.
     */
    where: HoldingWhereUniqueInput
    /**
     * In case the Holding found by the `where` argument doesn't exist, create a new Holding with this data.
     */
    create: XOR<HoldingCreateInput, HoldingUncheckedCreateInput>
    /**
     * In case the Holding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HoldingUpdateInput, HoldingUncheckedUpdateInput>
  }

  /**
   * Holding delete
   */
  export type HoldingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
    /**
     * Filter which Holding to delete.
     */
    where: HoldingWhereUniqueInput
  }

  /**
   * Holding deleteMany
   */
  export type HoldingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Holdings to delete
     */
    where?: HoldingWhereInput
    /**
     * Limit how many Holdings to delete.
     */
    limit?: number
  }

  /**
   * Holding without action
   */
  export type HoldingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Holding
     */
    select?: HoldingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Holding
     */
    omit?: HoldingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HoldingInclude<ExtArgs> | null
  }


  /**
   * Model Watchlist
   */

  export type AggregateWatchlist = {
    _count: WatchlistCountAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  export type WatchlistMinAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    createdAt: Date | null
  }

  export type WatchlistMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    createdAt: Date | null
  }

  export type WatchlistCountAggregateOutputType = {
    id: number
    userId: number
    symbol: number
    createdAt: number
    _all: number
  }


  export type WatchlistMinAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    createdAt?: true
  }

  export type WatchlistMaxAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    createdAt?: true
  }

  export type WatchlistCountAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    createdAt?: true
    _all?: true
  }

  export type WatchlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlist to aggregate.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Watchlists
    **/
    _count?: true | WatchlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WatchlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WatchlistMaxAggregateInputType
  }

  export type GetWatchlistAggregateType<T extends WatchlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWatchlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWatchlist[P]>
      : GetScalarType<T[P], AggregateWatchlist[P]>
  }




  export type WatchlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WatchlistWhereInput
    orderBy?: WatchlistOrderByWithAggregationInput | WatchlistOrderByWithAggregationInput[]
    by: WatchlistScalarFieldEnum[] | WatchlistScalarFieldEnum
    having?: WatchlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WatchlistCountAggregateInputType | true
    _min?: WatchlistMinAggregateInputType
    _max?: WatchlistMaxAggregateInputType
  }

  export type WatchlistGroupByOutputType = {
    id: string
    userId: string
    symbol: string
    createdAt: Date
    _count: WatchlistCountAggregateOutputType | null
    _min: WatchlistMinAggregateOutputType | null
    _max: WatchlistMaxAggregateOutputType | null
  }

  type GetWatchlistGroupByPayload<T extends WatchlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WatchlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WatchlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
            : GetScalarType<T[P], WatchlistGroupByOutputType[P]>
        }
      >
    >


  export type WatchlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["watchlist"]>

  export type WatchlistSelectScalar = {
    id?: boolean
    userId?: boolean
    symbol?: boolean
    createdAt?: boolean
  }

  export type WatchlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "symbol" | "createdAt", ExtArgs["result"]["watchlist"]>
  export type WatchlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type WatchlistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type WatchlistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $WatchlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Watchlist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      symbol: string
      createdAt: Date
    }, ExtArgs["result"]["watchlist"]>
    composites: {}
  }

  type WatchlistGetPayload<S extends boolean | null | undefined | WatchlistDefaultArgs> = $Result.GetResult<Prisma.$WatchlistPayload, S>

  type WatchlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WatchlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WatchlistCountAggregateInputType | true
    }

  export interface WatchlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Watchlist'], meta: { name: 'Watchlist' } }
    /**
     * Find zero or one Watchlist that matches the filter.
     * @param {WatchlistFindUniqueArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WatchlistFindUniqueArgs>(args: SelectSubset<T, WatchlistFindUniqueArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Watchlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WatchlistFindUniqueOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WatchlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WatchlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WatchlistFindFirstArgs>(args?: SelectSubset<T, WatchlistFindFirstArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Watchlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindFirstOrThrowArgs} args - Arguments to find a Watchlist
     * @example
     * // Get one Watchlist
     * const watchlist = await prisma.watchlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WatchlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WatchlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Watchlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Watchlists
     * const watchlists = await prisma.watchlist.findMany()
     * 
     * // Get first 10 Watchlists
     * const watchlists = await prisma.watchlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WatchlistFindManyArgs>(args?: SelectSubset<T, WatchlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Watchlist.
     * @param {WatchlistCreateArgs} args - Arguments to create a Watchlist.
     * @example
     * // Create one Watchlist
     * const Watchlist = await prisma.watchlist.create({
     *   data: {
     *     // ... data to create a Watchlist
     *   }
     * })
     * 
     */
    create<T extends WatchlistCreateArgs>(args: SelectSubset<T, WatchlistCreateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Watchlists.
     * @param {WatchlistCreateManyArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WatchlistCreateManyArgs>(args?: SelectSubset<T, WatchlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Watchlists and returns the data saved in the database.
     * @param {WatchlistCreateManyAndReturnArgs} args - Arguments to create many Watchlists.
     * @example
     * // Create many Watchlists
     * const watchlist = await prisma.watchlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WatchlistCreateManyAndReturnArgs>(args?: SelectSubset<T, WatchlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Watchlist.
     * @param {WatchlistDeleteArgs} args - Arguments to delete one Watchlist.
     * @example
     * // Delete one Watchlist
     * const Watchlist = await prisma.watchlist.delete({
     *   where: {
     *     // ... filter to delete one Watchlist
     *   }
     * })
     * 
     */
    delete<T extends WatchlistDeleteArgs>(args: SelectSubset<T, WatchlistDeleteArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Watchlist.
     * @param {WatchlistUpdateArgs} args - Arguments to update one Watchlist.
     * @example
     * // Update one Watchlist
     * const watchlist = await prisma.watchlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WatchlistUpdateArgs>(args: SelectSubset<T, WatchlistUpdateArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Watchlists.
     * @param {WatchlistDeleteManyArgs} args - Arguments to filter Watchlists to delete.
     * @example
     * // Delete a few Watchlists
     * const { count } = await prisma.watchlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WatchlistDeleteManyArgs>(args?: SelectSubset<T, WatchlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WatchlistUpdateManyArgs>(args: SelectSubset<T, WatchlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Watchlists and returns the data updated in the database.
     * @param {WatchlistUpdateManyAndReturnArgs} args - Arguments to update many Watchlists.
     * @example
     * // Update many Watchlists
     * const watchlist = await prisma.watchlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Watchlists and only return the `id`
     * const watchlistWithIdOnly = await prisma.watchlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WatchlistUpdateManyAndReturnArgs>(args: SelectSubset<T, WatchlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Watchlist.
     * @param {WatchlistUpsertArgs} args - Arguments to update or create a Watchlist.
     * @example
     * // Update or create a Watchlist
     * const watchlist = await prisma.watchlist.upsert({
     *   create: {
     *     // ... data to create a Watchlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Watchlist we want to update
     *   }
     * })
     */
    upsert<T extends WatchlistUpsertArgs>(args: SelectSubset<T, WatchlistUpsertArgs<ExtArgs>>): Prisma__WatchlistClient<$Result.GetResult<Prisma.$WatchlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Watchlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistCountArgs} args - Arguments to filter Watchlists to count.
     * @example
     * // Count the number of Watchlists
     * const count = await prisma.watchlist.count({
     *   where: {
     *     // ... the filter for the Watchlists we want to count
     *   }
     * })
    **/
    count<T extends WatchlistCountArgs>(
      args?: Subset<T, WatchlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WatchlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WatchlistAggregateArgs>(args: Subset<T, WatchlistAggregateArgs>): Prisma.PrismaPromise<GetWatchlistAggregateType<T>>

    /**
     * Group by Watchlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WatchlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WatchlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WatchlistGroupByArgs['orderBy'] }
        : { orderBy?: WatchlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WatchlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWatchlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Watchlist model
   */
  readonly fields: WatchlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Watchlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WatchlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Watchlist model
   */
  interface WatchlistFieldRefs {
    readonly id: FieldRef<"Watchlist", 'String'>
    readonly userId: FieldRef<"Watchlist", 'String'>
    readonly symbol: FieldRef<"Watchlist", 'String'>
    readonly createdAt: FieldRef<"Watchlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Watchlist findUnique
   */
  export type WatchlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findUniqueOrThrow
   */
  export type WatchlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist findFirst
   */
  export type WatchlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findFirstOrThrow
   */
  export type WatchlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlist to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist findMany
   */
  export type WatchlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter, which Watchlists to fetch.
     */
    where?: WatchlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Watchlists to fetch.
     */
    orderBy?: WatchlistOrderByWithRelationInput | WatchlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Watchlists.
     */
    cursor?: WatchlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Watchlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Watchlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Watchlists.
     */
    distinct?: WatchlistScalarFieldEnum | WatchlistScalarFieldEnum[]
  }

  /**
   * Watchlist create
   */
  export type WatchlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Watchlist.
     */
    data: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
  }

  /**
   * Watchlist createMany
   */
  export type WatchlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Watchlist createManyAndReturn
   */
  export type WatchlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * The data used to create many Watchlists.
     */
    data: WatchlistCreateManyInput | WatchlistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watchlist update
   */
  export type WatchlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Watchlist.
     */
    data: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
    /**
     * Choose, which Watchlist to update.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist updateMany
   */
  export type WatchlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Watchlists.
     */
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyInput>
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number
  }

  /**
   * Watchlist updateManyAndReturn
   */
  export type WatchlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * The data used to update Watchlists.
     */
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyInput>
    /**
     * Filter which Watchlists to update
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Watchlist upsert
   */
  export type WatchlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Watchlist to update in case it exists.
     */
    where: WatchlistWhereUniqueInput
    /**
     * In case the Watchlist found by the `where` argument doesn't exist, create a new Watchlist with this data.
     */
    create: XOR<WatchlistCreateInput, WatchlistUncheckedCreateInput>
    /**
     * In case the Watchlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WatchlistUpdateInput, WatchlistUncheckedUpdateInput>
  }

  /**
   * Watchlist delete
   */
  export type WatchlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
    /**
     * Filter which Watchlist to delete.
     */
    where: WatchlistWhereUniqueInput
  }

  /**
   * Watchlist deleteMany
   */
  export type WatchlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Watchlists to delete
     */
    where?: WatchlistWhereInput
    /**
     * Limit how many Watchlists to delete.
     */
    limit?: number
  }

  /**
   * Watchlist without action
   */
  export type WatchlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Watchlist
     */
    select?: WatchlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Watchlist
     */
    omit?: WatchlistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WatchlistInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    filledQty: Decimal | null
    remainingQty: Decimal | null
    averageFillPrice: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    filledQty: Decimal | null
    remainingQty: Decimal | null
    averageFillPrice: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    price: Decimal | null
    quantity: Decimal | null
    filledQty: Decimal | null
    remainingQty: Decimal | null
    averageFillPrice: Decimal | null
    status: $Enums.OrderStatus | null
    exchangeOrderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    symbol: string | null
    side: $Enums.OrderSide | null
    orderType: $Enums.OrderType | null
    price: Decimal | null
    quantity: Decimal | null
    filledQty: Decimal | null
    remainingQty: Decimal | null
    averageFillPrice: Decimal | null
    status: $Enums.OrderStatus | null
    exchangeOrderId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    userId: number
    symbol: number
    side: number
    orderType: number
    price: number
    quantity: number
    filledQty: number
    remainingQty: number
    averageFillPrice: number
    status: number
    exchangeOrderId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    price?: true
    quantity?: true
    filledQty?: true
    remainingQty?: true
    averageFillPrice?: true
  }

  export type OrderSumAggregateInputType = {
    price?: true
    quantity?: true
    filledQty?: true
    remainingQty?: true
    averageFillPrice?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    side?: true
    orderType?: true
    price?: true
    quantity?: true
    filledQty?: true
    remainingQty?: true
    averageFillPrice?: true
    status?: true
    exchangeOrderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    side?: true
    orderType?: true
    price?: true
    quantity?: true
    filledQty?: true
    remainingQty?: true
    averageFillPrice?: true
    status?: true
    exchangeOrderId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    userId?: true
    symbol?: true
    side?: true
    orderType?: true
    price?: true
    quantity?: true
    filledQty?: true
    remainingQty?: true
    averageFillPrice?: true
    status?: true
    exchangeOrderId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    userId: string
    symbol: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal
    quantity: Decimal
    filledQty: Decimal
    remainingQty: Decimal
    averageFillPrice: Decimal
    status: $Enums.OrderStatus
    exchangeOrderId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    side?: boolean
    orderType?: boolean
    price?: boolean
    quantity?: boolean
    filledQty?: boolean
    remainingQty?: boolean
    averageFillPrice?: boolean
    status?: boolean
    exchangeOrderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    side?: boolean
    orderType?: boolean
    price?: boolean
    quantity?: boolean
    filledQty?: boolean
    remainingQty?: boolean
    averageFillPrice?: boolean
    status?: boolean
    exchangeOrderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symbol?: boolean
    side?: boolean
    orderType?: boolean
    price?: boolean
    quantity?: boolean
    filledQty?: boolean
    remainingQty?: boolean
    averageFillPrice?: boolean
    status?: boolean
    exchangeOrderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    userId?: boolean
    symbol?: boolean
    side?: boolean
    orderType?: boolean
    price?: boolean
    quantity?: boolean
    filledQty?: boolean
    remainingQty?: boolean
    averageFillPrice?: boolean
    status?: boolean
    exchangeOrderId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "symbol" | "side" | "orderType" | "price" | "quantity" | "filledQty" | "remainingQty" | "averageFillPrice" | "status" | "exchangeOrderId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    stock?: boolean | StockDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      stock: Prisma.$StockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      symbol: string
      side: $Enums.OrderSide
      orderType: $Enums.OrderType
      price: Prisma.Decimal
      quantity: Prisma.Decimal
      filledQty: Prisma.Decimal
      remainingQty: Prisma.Decimal
      averageFillPrice: Prisma.Decimal
      status: $Enums.OrderStatus
      exchangeOrderId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends StockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StockDefaultArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly userId: FieldRef<"Order", 'String'>
    readonly symbol: FieldRef<"Order", 'String'>
    readonly side: FieldRef<"Order", 'OrderSide'>
    readonly orderType: FieldRef<"Order", 'OrderType'>
    readonly price: FieldRef<"Order", 'Decimal'>
    readonly quantity: FieldRef<"Order", 'Decimal'>
    readonly filledQty: FieldRef<"Order", 'Decimal'>
    readonly remainingQty: FieldRef<"Order", 'Decimal'>
    readonly averageFillPrice: FieldRef<"Order", 'Decimal'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly exchangeOrderId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model MatchExecution
   */

  export type AggregateMatchExecution = {
    _count: MatchExecutionCountAggregateOutputType | null
    _avg: MatchExecutionAvgAggregateOutputType | null
    _sum: MatchExecutionSumAggregateOutputType | null
    _min: MatchExecutionMinAggregateOutputType | null
    _max: MatchExecutionMaxAggregateOutputType | null
  }

  export type MatchExecutionAvgAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
  }

  export type MatchExecutionSumAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
  }

  export type MatchExecutionMinAggregateOutputType = {
    matchId: string | null
    buyOrderId: string | null
    sellOrderId: string | null
    symbol: string | null
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
    buyerId: string | null
    sellerId: string | null
    isBuyerMaker: boolean | null
    status: $Enums.SettlementStatus | null
    settledAt: Date | null
  }

  export type MatchExecutionMaxAggregateOutputType = {
    matchId: string | null
    buyOrderId: string | null
    sellOrderId: string | null
    symbol: string | null
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
    buyerId: string | null
    sellerId: string | null
    isBuyerMaker: boolean | null
    status: $Enums.SettlementStatus | null
    settledAt: Date | null
  }

  export type MatchExecutionCountAggregateOutputType = {
    matchId: number
    buyOrderId: number
    sellOrderId: number
    symbol: number
    price: number
    quantity: number
    quoteQuantity: number
    buyerId: number
    sellerId: number
    isBuyerMaker: number
    status: number
    settledAt: number
    _all: number
  }


  export type MatchExecutionAvgAggregateInputType = {
    price?: true
    quantity?: true
    quoteQuantity?: true
  }

  export type MatchExecutionSumAggregateInputType = {
    price?: true
    quantity?: true
    quoteQuantity?: true
  }

  export type MatchExecutionMinAggregateInputType = {
    matchId?: true
    buyOrderId?: true
    sellOrderId?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    buyerId?: true
    sellerId?: true
    isBuyerMaker?: true
    status?: true
    settledAt?: true
  }

  export type MatchExecutionMaxAggregateInputType = {
    matchId?: true
    buyOrderId?: true
    sellOrderId?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    buyerId?: true
    sellerId?: true
    isBuyerMaker?: true
    status?: true
    settledAt?: true
  }

  export type MatchExecutionCountAggregateInputType = {
    matchId?: true
    buyOrderId?: true
    sellOrderId?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    buyerId?: true
    sellerId?: true
    isBuyerMaker?: true
    status?: true
    settledAt?: true
    _all?: true
  }

  export type MatchExecutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchExecution to aggregate.
     */
    where?: MatchExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchExecutions to fetch.
     */
    orderBy?: MatchExecutionOrderByWithRelationInput | MatchExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MatchExecutions
    **/
    _count?: true | MatchExecutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchExecutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchExecutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchExecutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchExecutionMaxAggregateInputType
  }

  export type GetMatchExecutionAggregateType<T extends MatchExecutionAggregateArgs> = {
        [P in keyof T & keyof AggregateMatchExecution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatchExecution[P]>
      : GetScalarType<T[P], AggregateMatchExecution[P]>
  }




  export type MatchExecutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchExecutionWhereInput
    orderBy?: MatchExecutionOrderByWithAggregationInput | MatchExecutionOrderByWithAggregationInput[]
    by: MatchExecutionScalarFieldEnum[] | MatchExecutionScalarFieldEnum
    having?: MatchExecutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchExecutionCountAggregateInputType | true
    _avg?: MatchExecutionAvgAggregateInputType
    _sum?: MatchExecutionSumAggregateInputType
    _min?: MatchExecutionMinAggregateInputType
    _max?: MatchExecutionMaxAggregateInputType
  }

  export type MatchExecutionGroupByOutputType = {
    matchId: string
    buyOrderId: string
    sellOrderId: string
    symbol: string
    price: Decimal
    quantity: Decimal
    quoteQuantity: Decimal
    buyerId: string
    sellerId: string
    isBuyerMaker: boolean
    status: $Enums.SettlementStatus
    settledAt: Date
    _count: MatchExecutionCountAggregateOutputType | null
    _avg: MatchExecutionAvgAggregateOutputType | null
    _sum: MatchExecutionSumAggregateOutputType | null
    _min: MatchExecutionMinAggregateOutputType | null
    _max: MatchExecutionMaxAggregateOutputType | null
  }

  type GetMatchExecutionGroupByPayload<T extends MatchExecutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchExecutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchExecutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchExecutionGroupByOutputType[P]>
            : GetScalarType<T[P], MatchExecutionGroupByOutputType[P]>
        }
      >
    >


  export type MatchExecutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    matchId?: boolean
    buyOrderId?: boolean
    sellOrderId?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    buyerId?: boolean
    sellerId?: boolean
    isBuyerMaker?: boolean
    status?: boolean
    settledAt?: boolean
  }, ExtArgs["result"]["matchExecution"]>

  export type MatchExecutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    matchId?: boolean
    buyOrderId?: boolean
    sellOrderId?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    buyerId?: boolean
    sellerId?: boolean
    isBuyerMaker?: boolean
    status?: boolean
    settledAt?: boolean
  }, ExtArgs["result"]["matchExecution"]>

  export type MatchExecutionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    matchId?: boolean
    buyOrderId?: boolean
    sellOrderId?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    buyerId?: boolean
    sellerId?: boolean
    isBuyerMaker?: boolean
    status?: boolean
    settledAt?: boolean
  }, ExtArgs["result"]["matchExecution"]>

  export type MatchExecutionSelectScalar = {
    matchId?: boolean
    buyOrderId?: boolean
    sellOrderId?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    buyerId?: boolean
    sellerId?: boolean
    isBuyerMaker?: boolean
    status?: boolean
    settledAt?: boolean
  }

  export type MatchExecutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"matchId" | "buyOrderId" | "sellOrderId" | "symbol" | "price" | "quantity" | "quoteQuantity" | "buyerId" | "sellerId" | "isBuyerMaker" | "status" | "settledAt", ExtArgs["result"]["matchExecution"]>

  export type $MatchExecutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MatchExecution"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      matchId: string
      buyOrderId: string
      sellOrderId: string
      symbol: string
      price: Prisma.Decimal
      quantity: Prisma.Decimal
      quoteQuantity: Prisma.Decimal
      buyerId: string
      sellerId: string
      isBuyerMaker: boolean
      status: $Enums.SettlementStatus
      settledAt: Date
    }, ExtArgs["result"]["matchExecution"]>
    composites: {}
  }

  type MatchExecutionGetPayload<S extends boolean | null | undefined | MatchExecutionDefaultArgs> = $Result.GetResult<Prisma.$MatchExecutionPayload, S>

  type MatchExecutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchExecutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchExecutionCountAggregateInputType | true
    }

  export interface MatchExecutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MatchExecution'], meta: { name: 'MatchExecution' } }
    /**
     * Find zero or one MatchExecution that matches the filter.
     * @param {MatchExecutionFindUniqueArgs} args - Arguments to find a MatchExecution
     * @example
     * // Get one MatchExecution
     * const matchExecution = await prisma.matchExecution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchExecutionFindUniqueArgs>(args: SelectSubset<T, MatchExecutionFindUniqueArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MatchExecution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchExecutionFindUniqueOrThrowArgs} args - Arguments to find a MatchExecution
     * @example
     * // Get one MatchExecution
     * const matchExecution = await prisma.matchExecution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchExecutionFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchExecutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchExecution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionFindFirstArgs} args - Arguments to find a MatchExecution
     * @example
     * // Get one MatchExecution
     * const matchExecution = await prisma.matchExecution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchExecutionFindFirstArgs>(args?: SelectSubset<T, MatchExecutionFindFirstArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MatchExecution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionFindFirstOrThrowArgs} args - Arguments to find a MatchExecution
     * @example
     * // Get one MatchExecution
     * const matchExecution = await prisma.matchExecution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchExecutionFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchExecutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MatchExecutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MatchExecutions
     * const matchExecutions = await prisma.matchExecution.findMany()
     * 
     * // Get first 10 MatchExecutions
     * const matchExecutions = await prisma.matchExecution.findMany({ take: 10 })
     * 
     * // Only select the `matchId`
     * const matchExecutionWithMatchIdOnly = await prisma.matchExecution.findMany({ select: { matchId: true } })
     * 
     */
    findMany<T extends MatchExecutionFindManyArgs>(args?: SelectSubset<T, MatchExecutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MatchExecution.
     * @param {MatchExecutionCreateArgs} args - Arguments to create a MatchExecution.
     * @example
     * // Create one MatchExecution
     * const MatchExecution = await prisma.matchExecution.create({
     *   data: {
     *     // ... data to create a MatchExecution
     *   }
     * })
     * 
     */
    create<T extends MatchExecutionCreateArgs>(args: SelectSubset<T, MatchExecutionCreateArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MatchExecutions.
     * @param {MatchExecutionCreateManyArgs} args - Arguments to create many MatchExecutions.
     * @example
     * // Create many MatchExecutions
     * const matchExecution = await prisma.matchExecution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchExecutionCreateManyArgs>(args?: SelectSubset<T, MatchExecutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MatchExecutions and returns the data saved in the database.
     * @param {MatchExecutionCreateManyAndReturnArgs} args - Arguments to create many MatchExecutions.
     * @example
     * // Create many MatchExecutions
     * const matchExecution = await prisma.matchExecution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MatchExecutions and only return the `matchId`
     * const matchExecutionWithMatchIdOnly = await prisma.matchExecution.createManyAndReturn({
     *   select: { matchId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchExecutionCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchExecutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MatchExecution.
     * @param {MatchExecutionDeleteArgs} args - Arguments to delete one MatchExecution.
     * @example
     * // Delete one MatchExecution
     * const MatchExecution = await prisma.matchExecution.delete({
     *   where: {
     *     // ... filter to delete one MatchExecution
     *   }
     * })
     * 
     */
    delete<T extends MatchExecutionDeleteArgs>(args: SelectSubset<T, MatchExecutionDeleteArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MatchExecution.
     * @param {MatchExecutionUpdateArgs} args - Arguments to update one MatchExecution.
     * @example
     * // Update one MatchExecution
     * const matchExecution = await prisma.matchExecution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchExecutionUpdateArgs>(args: SelectSubset<T, MatchExecutionUpdateArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MatchExecutions.
     * @param {MatchExecutionDeleteManyArgs} args - Arguments to filter MatchExecutions to delete.
     * @example
     * // Delete a few MatchExecutions
     * const { count } = await prisma.matchExecution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchExecutionDeleteManyArgs>(args?: SelectSubset<T, MatchExecutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MatchExecutions
     * const matchExecution = await prisma.matchExecution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchExecutionUpdateManyArgs>(args: SelectSubset<T, MatchExecutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MatchExecutions and returns the data updated in the database.
     * @param {MatchExecutionUpdateManyAndReturnArgs} args - Arguments to update many MatchExecutions.
     * @example
     * // Update many MatchExecutions
     * const matchExecution = await prisma.matchExecution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MatchExecutions and only return the `matchId`
     * const matchExecutionWithMatchIdOnly = await prisma.matchExecution.updateManyAndReturn({
     *   select: { matchId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchExecutionUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchExecutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MatchExecution.
     * @param {MatchExecutionUpsertArgs} args - Arguments to update or create a MatchExecution.
     * @example
     * // Update or create a MatchExecution
     * const matchExecution = await prisma.matchExecution.upsert({
     *   create: {
     *     // ... data to create a MatchExecution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MatchExecution we want to update
     *   }
     * })
     */
    upsert<T extends MatchExecutionUpsertArgs>(args: SelectSubset<T, MatchExecutionUpsertArgs<ExtArgs>>): Prisma__MatchExecutionClient<$Result.GetResult<Prisma.$MatchExecutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MatchExecutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionCountArgs} args - Arguments to filter MatchExecutions to count.
     * @example
     * // Count the number of MatchExecutions
     * const count = await prisma.matchExecution.count({
     *   where: {
     *     // ... the filter for the MatchExecutions we want to count
     *   }
     * })
    **/
    count<T extends MatchExecutionCountArgs>(
      args?: Subset<T, MatchExecutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchExecutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MatchExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchExecutionAggregateArgs>(args: Subset<T, MatchExecutionAggregateArgs>): Prisma.PrismaPromise<GetMatchExecutionAggregateType<T>>

    /**
     * Group by MatchExecution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchExecutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchExecutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchExecutionGroupByArgs['orderBy'] }
        : { orderBy?: MatchExecutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchExecutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchExecutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MatchExecution model
   */
  readonly fields: MatchExecutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MatchExecution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchExecutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MatchExecution model
   */
  interface MatchExecutionFieldRefs {
    readonly matchId: FieldRef<"MatchExecution", 'String'>
    readonly buyOrderId: FieldRef<"MatchExecution", 'String'>
    readonly sellOrderId: FieldRef<"MatchExecution", 'String'>
    readonly symbol: FieldRef<"MatchExecution", 'String'>
    readonly price: FieldRef<"MatchExecution", 'Decimal'>
    readonly quantity: FieldRef<"MatchExecution", 'Decimal'>
    readonly quoteQuantity: FieldRef<"MatchExecution", 'Decimal'>
    readonly buyerId: FieldRef<"MatchExecution", 'String'>
    readonly sellerId: FieldRef<"MatchExecution", 'String'>
    readonly isBuyerMaker: FieldRef<"MatchExecution", 'Boolean'>
    readonly status: FieldRef<"MatchExecution", 'SettlementStatus'>
    readonly settledAt: FieldRef<"MatchExecution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MatchExecution findUnique
   */
  export type MatchExecutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter, which MatchExecution to fetch.
     */
    where: MatchExecutionWhereUniqueInput
  }

  /**
   * MatchExecution findUniqueOrThrow
   */
  export type MatchExecutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter, which MatchExecution to fetch.
     */
    where: MatchExecutionWhereUniqueInput
  }

  /**
   * MatchExecution findFirst
   */
  export type MatchExecutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter, which MatchExecution to fetch.
     */
    where?: MatchExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchExecutions to fetch.
     */
    orderBy?: MatchExecutionOrderByWithRelationInput | MatchExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchExecutions.
     */
    cursor?: MatchExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchExecutions.
     */
    distinct?: MatchExecutionScalarFieldEnum | MatchExecutionScalarFieldEnum[]
  }

  /**
   * MatchExecution findFirstOrThrow
   */
  export type MatchExecutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter, which MatchExecution to fetch.
     */
    where?: MatchExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchExecutions to fetch.
     */
    orderBy?: MatchExecutionOrderByWithRelationInput | MatchExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MatchExecutions.
     */
    cursor?: MatchExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchExecutions.
     */
    distinct?: MatchExecutionScalarFieldEnum | MatchExecutionScalarFieldEnum[]
  }

  /**
   * MatchExecution findMany
   */
  export type MatchExecutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter, which MatchExecutions to fetch.
     */
    where?: MatchExecutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MatchExecutions to fetch.
     */
    orderBy?: MatchExecutionOrderByWithRelationInput | MatchExecutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MatchExecutions.
     */
    cursor?: MatchExecutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MatchExecutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MatchExecutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MatchExecutions.
     */
    distinct?: MatchExecutionScalarFieldEnum | MatchExecutionScalarFieldEnum[]
  }

  /**
   * MatchExecution create
   */
  export type MatchExecutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * The data needed to create a MatchExecution.
     */
    data: XOR<MatchExecutionCreateInput, MatchExecutionUncheckedCreateInput>
  }

  /**
   * MatchExecution createMany
   */
  export type MatchExecutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MatchExecutions.
     */
    data: MatchExecutionCreateManyInput | MatchExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchExecution createManyAndReturn
   */
  export type MatchExecutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * The data used to create many MatchExecutions.
     */
    data: MatchExecutionCreateManyInput | MatchExecutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MatchExecution update
   */
  export type MatchExecutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * The data needed to update a MatchExecution.
     */
    data: XOR<MatchExecutionUpdateInput, MatchExecutionUncheckedUpdateInput>
    /**
     * Choose, which MatchExecution to update.
     */
    where: MatchExecutionWhereUniqueInput
  }

  /**
   * MatchExecution updateMany
   */
  export type MatchExecutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MatchExecutions.
     */
    data: XOR<MatchExecutionUpdateManyMutationInput, MatchExecutionUncheckedUpdateManyInput>
    /**
     * Filter which MatchExecutions to update
     */
    where?: MatchExecutionWhereInput
    /**
     * Limit how many MatchExecutions to update.
     */
    limit?: number
  }

  /**
   * MatchExecution updateManyAndReturn
   */
  export type MatchExecutionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * The data used to update MatchExecutions.
     */
    data: XOR<MatchExecutionUpdateManyMutationInput, MatchExecutionUncheckedUpdateManyInput>
    /**
     * Filter which MatchExecutions to update
     */
    where?: MatchExecutionWhereInput
    /**
     * Limit how many MatchExecutions to update.
     */
    limit?: number
  }

  /**
   * MatchExecution upsert
   */
  export type MatchExecutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * The filter to search for the MatchExecution to update in case it exists.
     */
    where: MatchExecutionWhereUniqueInput
    /**
     * In case the MatchExecution found by the `where` argument doesn't exist, create a new MatchExecution with this data.
     */
    create: XOR<MatchExecutionCreateInput, MatchExecutionUncheckedCreateInput>
    /**
     * In case the MatchExecution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchExecutionUpdateInput, MatchExecutionUncheckedUpdateInput>
  }

  /**
   * MatchExecution delete
   */
  export type MatchExecutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
    /**
     * Filter which MatchExecution to delete.
     */
    where: MatchExecutionWhereUniqueInput
  }

  /**
   * MatchExecution deleteMany
   */
  export type MatchExecutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MatchExecutions to delete
     */
    where?: MatchExecutionWhereInput
    /**
     * Limit how many MatchExecutions to delete.
     */
    limit?: number
  }

  /**
   * MatchExecution without action
   */
  export type MatchExecutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MatchExecution
     */
    select?: MatchExecutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MatchExecution
     */
    omit?: MatchExecutionOmit<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
  }

  export type TradeSumAggregateOutputType = {
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    symbol: string | null
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
    isBuyerMaker: boolean | null
    timestamp: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    symbol: string | null
    price: Decimal | null
    quantity: Decimal | null
    quoteQuantity: Decimal | null
    isBuyerMaker: boolean | null
    timestamp: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    symbol: number
    price: number
    quantity: number
    quoteQuantity: number
    isBuyerMaker: number
    timestamp: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    price?: true
    quantity?: true
    quoteQuantity?: true
  }

  export type TradeSumAggregateInputType = {
    price?: true
    quantity?: true
    quoteQuantity?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    isBuyerMaker?: true
    timestamp?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    isBuyerMaker?: true
    timestamp?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    symbol?: true
    price?: true
    quantity?: true
    quoteQuantity?: true
    isBuyerMaker?: true
    timestamp?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    symbol: string
    price: Decimal
    quantity: Decimal
    quoteQuantity: Decimal
    isBuyerMaker: boolean
    timestamp: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    isBuyerMaker?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    isBuyerMaker?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    isBuyerMaker?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    symbol?: boolean
    price?: boolean
    quantity?: boolean
    quoteQuantity?: boolean
    isBuyerMaker?: boolean
    timestamp?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "symbol" | "price" | "quantity" | "quoteQuantity" | "isBuyerMaker" | "timestamp", ExtArgs["result"]["trade"]>

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      symbol: string
      price: Prisma.Decimal
      quantity: Prisma.Decimal
      quoteQuantity: Prisma.Decimal
      isBuyerMaker: boolean
      timestamp: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly symbol: FieldRef<"Trade", 'String'>
    readonly price: FieldRef<"Trade", 'Decimal'>
    readonly quantity: FieldRef<"Trade", 'Decimal'>
    readonly quoteQuantity: FieldRef<"Trade", 'Decimal'>
    readonly isBuyerMaker: FieldRef<"Trade", 'Boolean'>
    readonly timestamp: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
    balanceAfter: Decimal | null
    quantity: Decimal | null
    price: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
    balanceAfter: Decimal | null
    quantity: Decimal | null
    price: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: $Enums.TransactionType | null
    category: $Enums.TransactionCategory | null
    description: string | null
    amount: Decimal | null
    balanceAfter: Decimal | null
    ticker: string | null
    quantity: Decimal | null
    price: Decimal | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    walletId: string | null
    type: $Enums.TransactionType | null
    category: $Enums.TransactionCategory | null
    description: string | null
    amount: Decimal | null
    balanceAfter: Decimal | null
    ticker: string | null
    quantity: Decimal | null
    price: Decimal | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    walletId: number
    type: number
    category: number
    description: number
    amount: number
    balanceAfter: number
    ticker: number
    quantity: number
    price: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    balanceAfter?: true
    quantity?: true
    price?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    balanceAfter?: true
    quantity?: true
    price?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    category?: true
    description?: true
    amount?: true
    balanceAfter?: true
    ticker?: true
    quantity?: true
    price?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    category?: true
    description?: true
    amount?: true
    balanceAfter?: true
    ticker?: true
    quantity?: true
    price?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    walletId?: true
    type?: true
    category?: true
    description?: true
    amount?: true
    balanceAfter?: true
    ticker?: true
    quantity?: true
    price?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    walletId: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal
    balanceAfter: Decimal
    ticker: string | null
    quantity: Decimal | null
    price: Decimal | null
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    category?: boolean
    description?: boolean
    amount?: boolean
    balanceAfter?: boolean
    ticker?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    category?: boolean
    description?: boolean
    amount?: boolean
    balanceAfter?: boolean
    ticker?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletId?: boolean
    type?: boolean
    category?: boolean
    description?: boolean
    amount?: boolean
    balanceAfter?: boolean
    ticker?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    walletId?: boolean
    type?: boolean
    category?: boolean
    description?: boolean
    amount?: boolean
    balanceAfter?: boolean
    ticker?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletId" | "type" | "category" | "description" | "amount" | "balanceAfter" | "ticker" | "quantity" | "price" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    wallet?: boolean | WalletDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      wallet: Prisma.$WalletPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletId: string
      type: $Enums.TransactionType
      category: $Enums.TransactionCategory
      description: string
      amount: Prisma.Decimal
      balanceAfter: Prisma.Decimal
      ticker: string | null
      quantity: Prisma.Decimal | null
      price: Prisma.Decimal | null
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    wallet<T extends WalletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WalletDefaultArgs<ExtArgs>>): Prisma__WalletClient<$Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly walletId: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly category: FieldRef<"Transaction", 'TransactionCategory'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly balanceAfter: FieldRef<"Transaction", 'Decimal'>
    readonly ticker: FieldRef<"Transaction", 'String'>
    readonly quantity: FieldRef<"Transaction", 'Decimal'>
    readonly price: FieldRef<"Transaction", 'Decimal'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const StockScalarFieldEnum: {
    symbol: 'symbol',
    companyName: 'companyName',
    sector: 'sector',
    status: 'status',
    baseAsset: 'baseAsset',
    quoteAsset: 'quoteAsset',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const MarketQuoteScalarFieldEnum: {
    symbol: 'symbol',
    price: 'price',
    previousClose: 'previousClose',
    open: 'open',
    dayHigh: 'dayHigh',
    dayLow: 'dayLow',
    volume: 'volume',
    change: 'change',
    changePercent: 'changePercent',
    isDelayed: 'isDelayed',
    updatedAt: 'updatedAt'
  };

  export type MarketQuoteScalarFieldEnum = (typeof MarketQuoteScalarFieldEnum)[keyof typeof MarketQuoteScalarFieldEnum]


  export const WalletScalarFieldEnum: {
    userId: 'userId',
    balance: 'balance',
    lockedBalance: 'lockedBalance',
    assetsHeld: 'assetsHeld',
    updatedAt: 'updatedAt'
  };

  export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum]


  export const HoldingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    symbol: 'symbol',
    quantity: 'quantity',
    lockedQuantity: 'lockedQuantity',
    averageCost: 'averageCost',
    realizedPnl: 'realizedPnl',
    updatedAt: 'updatedAt'
  };

  export type HoldingScalarFieldEnum = (typeof HoldingScalarFieldEnum)[keyof typeof HoldingScalarFieldEnum]


  export const WatchlistScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    symbol: 'symbol',
    createdAt: 'createdAt'
  };

  export type WatchlistScalarFieldEnum = (typeof WatchlistScalarFieldEnum)[keyof typeof WatchlistScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    symbol: 'symbol',
    side: 'side',
    orderType: 'orderType',
    price: 'price',
    quantity: 'quantity',
    filledQty: 'filledQty',
    remainingQty: 'remainingQty',
    averageFillPrice: 'averageFillPrice',
    status: 'status',
    exchangeOrderId: 'exchangeOrderId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const MatchExecutionScalarFieldEnum: {
    matchId: 'matchId',
    buyOrderId: 'buyOrderId',
    sellOrderId: 'sellOrderId',
    symbol: 'symbol',
    price: 'price',
    quantity: 'quantity',
    quoteQuantity: 'quoteQuantity',
    buyerId: 'buyerId',
    sellerId: 'sellerId',
    isBuyerMaker: 'isBuyerMaker',
    status: 'status',
    settledAt: 'settledAt'
  };

  export type MatchExecutionScalarFieldEnum = (typeof MatchExecutionScalarFieldEnum)[keyof typeof MatchExecutionScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    symbol: 'symbol',
    price: 'price',
    quantity: 'quantity',
    quoteQuantity: 'quoteQuantity',
    isBuyerMaker: 'isBuyerMaker',
    timestamp: 'timestamp'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    walletId: 'walletId',
    type: 'type',
    category: 'category',
    description: 'description',
    amount: 'amount',
    balanceAfter: 'balanceAfter',
    ticker: 'ticker',
    quantity: 'quantity',
    price: 'price',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'StockStatus'
   */
  export type EnumStockStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockStatus'>
    


  /**
   * Reference to a field of type 'StockStatus[]'
   */
  export type ListEnumStockStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StockStatus[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'OrderSide'
   */
  export type EnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide'>
    


  /**
   * Reference to a field of type 'OrderSide[]'
   */
  export type ListEnumOrderSideFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderSide[]'>
    


  /**
   * Reference to a field of type 'OrderType'
   */
  export type EnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType'>
    


  /**
   * Reference to a field of type 'OrderType[]'
   */
  export type ListEnumOrderTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderType[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'SettlementStatus'
   */
  export type EnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus'>
    


  /**
   * Reference to a field of type 'SettlementStatus[]'
   */
  export type ListEnumSettlementStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SettlementStatus[]'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    


  /**
   * Reference to a field of type 'TransactionType[]'
   */
  export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>
    


  /**
   * Reference to a field of type 'TransactionCategory'
   */
  export type EnumTransactionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionCategory'>
    


  /**
   * Reference to a field of type 'TransactionCategory[]'
   */
  export type ListEnumTransactionCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionCategory[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    orders?: OrderListRelationFilter
    holdings?: HoldingListRelationFilter
    watchlist?: WatchlistListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    wallet?: WalletOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    holdings?: HoldingOrderByRelationAggregateInput
    watchlist?: WatchlistOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    accounts?: AccountListRelationFilter
    wallet?: XOR<WalletNullableScalarRelationFilter, WalletWhereInput> | null
    orders?: OrderListRelationFilter
    holdings?: HoldingListRelationFilter
    watchlist?: WatchlistListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    symbol?: StringFilter<"Stock"> | string
    companyName?: StringFilter<"Stock"> | string
    sector?: StringNullableFilter<"Stock"> | string | null
    status?: EnumStockStatusFilter<"Stock"> | $Enums.StockStatus
    baseAsset?: StringFilter<"Stock"> | string
    quoteAsset?: StringFilter<"Stock"> | string
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    orders?: OrderListRelationFilter
    holdings?: HoldingListRelationFilter
    watchlist?: WatchlistListRelationFilter
    quote?: XOR<MarketQuoteNullableScalarRelationFilter, MarketQuoteWhereInput> | null
  }

  export type StockOrderByWithRelationInput = {
    symbol?: SortOrder
    companyName?: SortOrder
    sector?: SortOrderInput | SortOrder
    status?: SortOrder
    baseAsset?: SortOrder
    quoteAsset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    holdings?: HoldingOrderByRelationAggregateInput
    watchlist?: WatchlistOrderByRelationAggregateInput
    quote?: MarketQuoteOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    symbol?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    companyName?: StringFilter<"Stock"> | string
    sector?: StringNullableFilter<"Stock"> | string | null
    status?: EnumStockStatusFilter<"Stock"> | $Enums.StockStatus
    baseAsset?: StringFilter<"Stock"> | string
    quoteAsset?: StringFilter<"Stock"> | string
    createdAt?: DateTimeFilter<"Stock"> | Date | string
    updatedAt?: DateTimeFilter<"Stock"> | Date | string
    orders?: OrderListRelationFilter
    holdings?: HoldingListRelationFilter
    watchlist?: WatchlistListRelationFilter
    quote?: XOR<MarketQuoteNullableScalarRelationFilter, MarketQuoteWhereInput> | null
  }, "symbol">

  export type StockOrderByWithAggregationInput = {
    symbol?: SortOrder
    companyName?: SortOrder
    sector?: SortOrderInput | SortOrder
    status?: SortOrder
    baseAsset?: SortOrder
    quoteAsset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    symbol?: StringWithAggregatesFilter<"Stock"> | string
    companyName?: StringWithAggregatesFilter<"Stock"> | string
    sector?: StringNullableWithAggregatesFilter<"Stock"> | string | null
    status?: EnumStockStatusWithAggregatesFilter<"Stock"> | $Enums.StockStatus
    baseAsset?: StringWithAggregatesFilter<"Stock"> | string
    quoteAsset?: StringWithAggregatesFilter<"Stock"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
  }

  export type MarketQuoteWhereInput = {
    AND?: MarketQuoteWhereInput | MarketQuoteWhereInput[]
    OR?: MarketQuoteWhereInput[]
    NOT?: MarketQuoteWhereInput | MarketQuoteWhereInput[]
    symbol?: StringFilter<"MarketQuote"> | string
    price?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    open?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    change?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFilter<"MarketQuote"> | boolean
    updatedAt?: DateTimeFilter<"MarketQuote"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type MarketQuoteOrderByWithRelationInput = {
    symbol?: SortOrder
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
    isDelayed?: SortOrder
    updatedAt?: SortOrder
    stock?: StockOrderByWithRelationInput
  }

  export type MarketQuoteWhereUniqueInput = Prisma.AtLeast<{
    symbol?: string
    AND?: MarketQuoteWhereInput | MarketQuoteWhereInput[]
    OR?: MarketQuoteWhereInput[]
    NOT?: MarketQuoteWhereInput | MarketQuoteWhereInput[]
    price?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    open?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    change?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFilter<"MarketQuote"> | boolean
    updatedAt?: DateTimeFilter<"MarketQuote"> | Date | string
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "symbol">

  export type MarketQuoteOrderByWithAggregationInput = {
    symbol?: SortOrder
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
    isDelayed?: SortOrder
    updatedAt?: SortOrder
    _count?: MarketQuoteCountOrderByAggregateInput
    _avg?: MarketQuoteAvgOrderByAggregateInput
    _max?: MarketQuoteMaxOrderByAggregateInput
    _min?: MarketQuoteMinOrderByAggregateInput
    _sum?: MarketQuoteSumOrderByAggregateInput
  }

  export type MarketQuoteScalarWhereWithAggregatesInput = {
    AND?: MarketQuoteScalarWhereWithAggregatesInput | MarketQuoteScalarWhereWithAggregatesInput[]
    OR?: MarketQuoteScalarWhereWithAggregatesInput[]
    NOT?: MarketQuoteScalarWhereWithAggregatesInput | MarketQuoteScalarWhereWithAggregatesInput[]
    symbol?: StringWithAggregatesFilter<"MarketQuote"> | string
    price?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    open?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    volume?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    change?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalWithAggregatesFilter<"MarketQuote"> | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolWithAggregatesFilter<"MarketQuote"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"MarketQuote"> | Date | string
  }

  export type WalletWhereInput = {
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    userId?: StringFilter<"Wallet"> | string
    balance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonFilter<"Wallet">
    updatedAt?: DateTimeNullableFilter<"Wallet"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }

  export type WalletOrderByWithRelationInput = {
    userId?: SortOrder
    balance?: SortOrder
    lockedBalance?: SortOrder
    assetsHeld?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type WalletWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: WalletWhereInput | WalletWhereInput[]
    OR?: WalletWhereInput[]
    NOT?: WalletWhereInput | WalletWhereInput[]
    balance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonFilter<"Wallet">
    updatedAt?: DateTimeNullableFilter<"Wallet"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    transactions?: TransactionListRelationFilter
  }, "userId">

  export type WalletOrderByWithAggregationInput = {
    userId?: SortOrder
    balance?: SortOrder
    lockedBalance?: SortOrder
    assetsHeld?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: WalletCountOrderByAggregateInput
    _avg?: WalletAvgOrderByAggregateInput
    _max?: WalletMaxOrderByAggregateInput
    _min?: WalletMinOrderByAggregateInput
    _sum?: WalletSumOrderByAggregateInput
  }

  export type WalletScalarWhereWithAggregatesInput = {
    AND?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    OR?: WalletScalarWhereWithAggregatesInput[]
    NOT?: WalletScalarWhereWithAggregatesInput | WalletScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"Wallet"> | string
    balance?: DecimalWithAggregatesFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalWithAggregatesFilter<"Wallet"> | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonWithAggregatesFilter<"Wallet">
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Wallet"> | Date | string | null
  }

  export type HoldingWhereInput = {
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    id?: StringFilter<"Holding"> | string
    userId?: StringFilter<"Holding"> | string
    symbol?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type HoldingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    stock?: StockOrderByWithRelationInput
  }

  export type HoldingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_symbol?: HoldingUserIdSymbolCompoundUniqueInput
    AND?: HoldingWhereInput | HoldingWhereInput[]
    OR?: HoldingWhereInput[]
    NOT?: HoldingWhereInput | HoldingWhereInput[]
    userId?: StringFilter<"Holding"> | string
    symbol?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id" | "userId_symbol">

  export type HoldingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
    updatedAt?: SortOrder
    _count?: HoldingCountOrderByAggregateInput
    _avg?: HoldingAvgOrderByAggregateInput
    _max?: HoldingMaxOrderByAggregateInput
    _min?: HoldingMinOrderByAggregateInput
    _sum?: HoldingSumOrderByAggregateInput
  }

  export type HoldingScalarWhereWithAggregatesInput = {
    AND?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    OR?: HoldingScalarWhereWithAggregatesInput[]
    NOT?: HoldingScalarWhereWithAggregatesInput | HoldingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Holding"> | string
    userId?: StringWithAggregatesFilter<"Holding"> | string
    symbol?: StringWithAggregatesFilter<"Holding"> | string
    quantity?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalWithAggregatesFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeWithAggregatesFilter<"Holding"> | Date | string
  }

  export type WatchlistWhereInput = {
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userId?: StringFilter<"Watchlist"> | string
    symbol?: StringFilter<"Watchlist"> | string
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type WatchlistOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    stock?: StockOrderByWithRelationInput
  }

  export type WatchlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_symbol?: WatchlistUserIdSymbolCompoundUniqueInput
    AND?: WatchlistWhereInput | WatchlistWhereInput[]
    OR?: WatchlistWhereInput[]
    NOT?: WatchlistWhereInput | WatchlistWhereInput[]
    userId?: StringFilter<"Watchlist"> | string
    symbol?: StringFilter<"Watchlist"> | string
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id" | "userId_symbol">

  export type WatchlistOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    createdAt?: SortOrder
    _count?: WatchlistCountOrderByAggregateInput
    _max?: WatchlistMaxOrderByAggregateInput
    _min?: WatchlistMinOrderByAggregateInput
  }

  export type WatchlistScalarWhereWithAggregatesInput = {
    AND?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    OR?: WatchlistScalarWhereWithAggregatesInput[]
    NOT?: WatchlistScalarWhereWithAggregatesInput | WatchlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Watchlist"> | string
    userId?: StringWithAggregatesFilter<"Watchlist"> | string
    symbol?: StringWithAggregatesFilter<"Watchlist"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Watchlist"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    price?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    exchangeOrderId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
    status?: SortOrder
    exchangeOrderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    stock?: StockOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    userId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    price?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    exchangeOrderId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    stock?: XOR<StockScalarRelationFilter, StockWhereInput>
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
    status?: SortOrder
    exchangeOrderId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    userId?: StringWithAggregatesFilter<"Order"> | string
    symbol?: StringWithAggregatesFilter<"Order"> | string
    side?: EnumOrderSideWithAggregatesFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeWithAggregatesFilter<"Order"> | $Enums.OrderType
    price?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    exchangeOrderId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type MatchExecutionWhereInput = {
    AND?: MatchExecutionWhereInput | MatchExecutionWhereInput[]
    OR?: MatchExecutionWhereInput[]
    NOT?: MatchExecutionWhereInput | MatchExecutionWhereInput[]
    matchId?: StringFilter<"MatchExecution"> | string
    buyOrderId?: StringFilter<"MatchExecution"> | string
    sellOrderId?: StringFilter<"MatchExecution"> | string
    symbol?: StringFilter<"MatchExecution"> | string
    price?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    buyerId?: StringFilter<"MatchExecution"> | string
    sellerId?: StringFilter<"MatchExecution"> | string
    isBuyerMaker?: BoolFilter<"MatchExecution"> | boolean
    status?: EnumSettlementStatusFilter<"MatchExecution"> | $Enums.SettlementStatus
    settledAt?: DateTimeFilter<"MatchExecution"> | Date | string
  }

  export type MatchExecutionOrderByWithRelationInput = {
    matchId?: SortOrder
    buyOrderId?: SortOrder
    sellOrderId?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    isBuyerMaker?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
  }

  export type MatchExecutionWhereUniqueInput = Prisma.AtLeast<{
    matchId?: string
    AND?: MatchExecutionWhereInput | MatchExecutionWhereInput[]
    OR?: MatchExecutionWhereInput[]
    NOT?: MatchExecutionWhereInput | MatchExecutionWhereInput[]
    buyOrderId?: StringFilter<"MatchExecution"> | string
    sellOrderId?: StringFilter<"MatchExecution"> | string
    symbol?: StringFilter<"MatchExecution"> | string
    price?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    buyerId?: StringFilter<"MatchExecution"> | string
    sellerId?: StringFilter<"MatchExecution"> | string
    isBuyerMaker?: BoolFilter<"MatchExecution"> | boolean
    status?: EnumSettlementStatusFilter<"MatchExecution"> | $Enums.SettlementStatus
    settledAt?: DateTimeFilter<"MatchExecution"> | Date | string
  }, "matchId">

  export type MatchExecutionOrderByWithAggregationInput = {
    matchId?: SortOrder
    buyOrderId?: SortOrder
    sellOrderId?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    isBuyerMaker?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
    _count?: MatchExecutionCountOrderByAggregateInput
    _avg?: MatchExecutionAvgOrderByAggregateInput
    _max?: MatchExecutionMaxOrderByAggregateInput
    _min?: MatchExecutionMinOrderByAggregateInput
    _sum?: MatchExecutionSumOrderByAggregateInput
  }

  export type MatchExecutionScalarWhereWithAggregatesInput = {
    AND?: MatchExecutionScalarWhereWithAggregatesInput | MatchExecutionScalarWhereWithAggregatesInput[]
    OR?: MatchExecutionScalarWhereWithAggregatesInput[]
    NOT?: MatchExecutionScalarWhereWithAggregatesInput | MatchExecutionScalarWhereWithAggregatesInput[]
    matchId?: StringWithAggregatesFilter<"MatchExecution"> | string
    buyOrderId?: StringWithAggregatesFilter<"MatchExecution"> | string
    sellOrderId?: StringWithAggregatesFilter<"MatchExecution"> | string
    symbol?: StringWithAggregatesFilter<"MatchExecution"> | string
    price?: DecimalWithAggregatesFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalWithAggregatesFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalWithAggregatesFilter<"MatchExecution"> | Decimal | DecimalJsLike | number | string
    buyerId?: StringWithAggregatesFilter<"MatchExecution"> | string
    sellerId?: StringWithAggregatesFilter<"MatchExecution"> | string
    isBuyerMaker?: BoolWithAggregatesFilter<"MatchExecution"> | boolean
    status?: EnumSettlementStatusWithAggregatesFilter<"MatchExecution"> | $Enums.SettlementStatus
    settledAt?: DateTimeWithAggregatesFilter<"MatchExecution"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    symbol?: StringFilter<"Trade"> | string
    price?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFilter<"Trade"> | boolean
    timestamp?: DateTimeFilter<"Trade"> | Date | string
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    isBuyerMaker?: SortOrder
    timestamp?: SortOrder
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    symbol?: StringFilter<"Trade"> | string
    price?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFilter<"Trade"> | boolean
    timestamp?: DateTimeFilter<"Trade"> | Date | string
  }, "id">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    isBuyerMaker?: SortOrder
    timestamp?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    symbol?: StringWithAggregatesFilter<"Trade"> | string
    price?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalWithAggregatesFilter<"Trade"> | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolWithAggregatesFilter<"Trade"> | boolean
    timestamp?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    category?: EnumTransactionCategoryFilter<"Transaction"> | $Enums.TransactionCategory
    description?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    ticker?: StringNullableFilter<"Transaction"> | string | null
    quantity?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    category?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    ticker?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    wallet?: WalletOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    walletId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    category?: EnumTransactionCategoryFilter<"Transaction"> | $Enums.TransactionCategory
    description?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    ticker?: StringNullableFilter<"Transaction"> | string | null
    quantity?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    wallet?: XOR<WalletScalarRelationFilter, WalletWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    category?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    ticker?: SortOrderInput | SortOrder
    quantity?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    walletId?: StringWithAggregatesFilter<"Transaction"> | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    category?: EnumTransactionCategoryWithAggregatesFilter<"Transaction"> | $Enums.TransactionCategory
    description?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    ticker?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    quantity?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    watchlist?: WatchlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StockCreateInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutStockInput
    holdings?: HoldingCreateNestedManyWithoutStockInput
    watchlist?: WatchlistCreateNestedManyWithoutStockInput
    quote?: MarketQuoteCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutStockInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutStockInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutStockInput
    quote?: MarketQuoteUncheckedCreateNestedOneWithoutStockInput
  }

  export type StockUpdateInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutStockNestedInput
    holdings?: HoldingUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUpdateOneWithoutStockNestedInput
  }

  export type StockUncheckedUpdateInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutStockNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUncheckedUpdateOneWithoutStockNestedInput
  }

  export type StockCreateManyInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StockUpdateManyMutationInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketQuoteCreateInput = {
    price?: Decimal | DecimalJsLike | number | string
    previousClose?: Decimal | DecimalJsLike | number | string
    open?: Decimal | DecimalJsLike | number | string
    dayHigh?: Decimal | DecimalJsLike | number | string
    dayLow?: Decimal | DecimalJsLike | number | string
    volume?: Decimal | DecimalJsLike | number | string
    change?: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string
    isDelayed?: boolean
    updatedAt?: Date | string
    stock: StockCreateNestedOneWithoutQuoteInput
  }

  export type MarketQuoteUncheckedCreateInput = {
    symbol: string
    price?: Decimal | DecimalJsLike | number | string
    previousClose?: Decimal | DecimalJsLike | number | string
    open?: Decimal | DecimalJsLike | number | string
    dayHigh?: Decimal | DecimalJsLike | number | string
    dayLow?: Decimal | DecimalJsLike | number | string
    volume?: Decimal | DecimalJsLike | number | string
    change?: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string
    isDelayed?: boolean
    updatedAt?: Date | string
  }

  export type MarketQuoteUpdateInput = {
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutQuoteNestedInput
  }

  export type MarketQuoteUncheckedUpdateInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketQuoteCreateManyInput = {
    symbol: string
    price?: Decimal | DecimalJsLike | number | string
    previousClose?: Decimal | DecimalJsLike | number | string
    open?: Decimal | DecimalJsLike | number | string
    dayHigh?: Decimal | DecimalJsLike | number | string
    dayLow?: Decimal | DecimalJsLike | number | string
    volume?: Decimal | DecimalJsLike | number | string
    change?: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string
    isDelayed?: boolean
    updatedAt?: Date | string
  }

  export type MarketQuoteUpdateManyMutationInput = {
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketQuoteUncheckedUpdateManyInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WalletCreateInput = {
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutWalletInput
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateInput = {
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletUpdateInput = {
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type WalletCreateManyInput = {
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
  }

  export type WalletUpdateManyMutationInput = {
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WalletUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type HoldingCreateInput = {
    id?: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHoldingsInput
    stock: StockCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateInput = {
    id?: string
    userId: string
    symbol: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHoldingsNestedInput
    stock?: StockUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingCreateManyInput = {
    id?: string
    userId: string
    symbol: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type HoldingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWatchlistInput
    stock: StockCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistUncheckedCreateInput = {
    id?: string
    userId: string
    symbol: string
    createdAt?: Date | string
  }

  export type WatchlistUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput
    stock?: StockUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistCreateManyInput = {
    id?: string
    userId: string
    symbol: string
    createdAt?: Date | string
  }

  export type WatchlistUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
    stock: StockCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    userId: string
    symbol: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    stock?: StockUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyInput = {
    id?: string
    userId: string
    symbol: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchExecutionCreateInput = {
    matchId: string
    buyOrderId: string
    sellOrderId: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    buyerId: string
    sellerId: string
    isBuyerMaker: boolean
    status?: $Enums.SettlementStatus
    settledAt?: Date | string
  }

  export type MatchExecutionUncheckedCreateInput = {
    matchId: string
    buyOrderId: string
    sellOrderId: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    buyerId: string
    sellerId: string
    isBuyerMaker: boolean
    status?: $Enums.SettlementStatus
    settledAt?: Date | string
  }

  export type MatchExecutionUpdateInput = {
    matchId?: StringFieldUpdateOperationsInput | string
    buyOrderId?: StringFieldUpdateOperationsInput | string
    sellOrderId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    settledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchExecutionUncheckedUpdateInput = {
    matchId?: StringFieldUpdateOperationsInput | string
    buyOrderId?: StringFieldUpdateOperationsInput | string
    sellOrderId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    settledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchExecutionCreateManyInput = {
    matchId: string
    buyOrderId: string
    sellOrderId: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    buyerId: string
    sellerId: string
    isBuyerMaker: boolean
    status?: $Enums.SettlementStatus
    settledAt?: Date | string
  }

  export type MatchExecutionUpdateManyMutationInput = {
    matchId?: StringFieldUpdateOperationsInput | string
    buyOrderId?: StringFieldUpdateOperationsInput | string
    sellOrderId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    settledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchExecutionUncheckedUpdateManyInput = {
    matchId?: StringFieldUpdateOperationsInput | string
    buyOrderId?: StringFieldUpdateOperationsInput | string
    sellOrderId?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    buyerId?: StringFieldUpdateOperationsInput | string
    sellerId?: StringFieldUpdateOperationsInput | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumSettlementStatusFieldUpdateOperationsInput | $Enums.SettlementStatus
    settledAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    isBuyerMaker: boolean
    timestamp?: Date | string
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    isBuyerMaker: boolean
    timestamp?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: string
    symbol: string
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    quoteQuantity: Decimal | DecimalJsLike | number | string
    isBuyerMaker: boolean
    timestamp?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quoteQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isBuyerMaker?: BoolFieldUpdateOperationsInput | boolean
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    wallet: WalletCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    walletId: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    walletId: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletId?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type WalletNullableScalarRelationFilter = {
    is?: WalletWhereInput | null
    isNot?: WalletWhereInput | null
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type HoldingListRelationFilter = {
    every?: HoldingWhereInput
    some?: HoldingWhereInput
    none?: HoldingWhereInput
  }

  export type WatchlistListRelationFilter = {
    every?: WatchlistWhereInput
    some?: WatchlistWhereInput
    none?: WatchlistWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HoldingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WatchlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumStockStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StockStatus | EnumStockStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStockStatusFilter<$PrismaModel> | $Enums.StockStatus
  }

  export type MarketQuoteNullableScalarRelationFilter = {
    is?: MarketQuoteWhereInput | null
    isNot?: MarketQuoteWhereInput | null
  }

  export type StockCountOrderByAggregateInput = {
    symbol?: SortOrder
    companyName?: SortOrder
    sector?: SortOrder
    status?: SortOrder
    baseAsset?: SortOrder
    quoteAsset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    symbol?: SortOrder
    companyName?: SortOrder
    sector?: SortOrder
    status?: SortOrder
    baseAsset?: SortOrder
    quoteAsset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    symbol?: SortOrder
    companyName?: SortOrder
    sector?: SortOrder
    status?: SortOrder
    baseAsset?: SortOrder
    quoteAsset?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStockStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockStatus | EnumStockStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStockStatusWithAggregatesFilter<$PrismaModel> | $Enums.StockStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockStatusFilter<$PrismaModel>
    _max?: NestedEnumStockStatusFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StockScalarRelationFilter = {
    is?: StockWhereInput
    isNot?: StockWhereInput
  }

  export type MarketQuoteCountOrderByAggregateInput = {
    symbol?: SortOrder
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
    isDelayed?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketQuoteAvgOrderByAggregateInput = {
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
  }

  export type MarketQuoteMaxOrderByAggregateInput = {
    symbol?: SortOrder
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
    isDelayed?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketQuoteMinOrderByAggregateInput = {
    symbol?: SortOrder
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
    isDelayed?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarketQuoteSumOrderByAggregateInput = {
    price?: SortOrder
    previousClose?: SortOrder
    open?: SortOrder
    dayHigh?: SortOrder
    dayLow?: SortOrder
    volume?: SortOrder
    change?: SortOrder
    changePercent?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WalletCountOrderByAggregateInput = {
    userId?: SortOrder
    balance?: SortOrder
    lockedBalance?: SortOrder
    assetsHeld?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletAvgOrderByAggregateInput = {
    balance?: SortOrder
    lockedBalance?: SortOrder
  }

  export type WalletMaxOrderByAggregateInput = {
    userId?: SortOrder
    balance?: SortOrder
    lockedBalance?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletMinOrderByAggregateInput = {
    userId?: SortOrder
    balance?: SortOrder
    lockedBalance?: SortOrder
    updatedAt?: SortOrder
  }

  export type WalletSumOrderByAggregateInput = {
    balance?: SortOrder
    lockedBalance?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type HoldingUserIdSymbolCompoundUniqueInput = {
    userId: string
    symbol: string
  }

  export type HoldingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingAvgOrderByAggregateInput = {
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
  }

  export type HoldingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
    updatedAt?: SortOrder
  }

  export type HoldingSumOrderByAggregateInput = {
    quantity?: SortOrder
    lockedQuantity?: SortOrder
    averageCost?: SortOrder
    realizedPnl?: SortOrder
  }

  export type WatchlistUserIdSymbolCompoundUniqueInput = {
    userId: string
    symbol: string
  }

  export type WatchlistCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    createdAt?: SortOrder
  }

  export type WatchlistMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type EnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
    status?: SortOrder
    exchangeOrderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
    status?: SortOrder
    exchangeOrderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symbol?: SortOrder
    side?: SortOrder
    orderType?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
    status?: SortOrder
    exchangeOrderId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    filledQty?: SortOrder
    remainingQty?: SortOrder
    averageFillPrice?: SortOrder
  }

  export type EnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type EnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type MatchExecutionCountOrderByAggregateInput = {
    matchId?: SortOrder
    buyOrderId?: SortOrder
    sellOrderId?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    isBuyerMaker?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
  }

  export type MatchExecutionAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
  }

  export type MatchExecutionMaxOrderByAggregateInput = {
    matchId?: SortOrder
    buyOrderId?: SortOrder
    sellOrderId?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    isBuyerMaker?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
  }

  export type MatchExecutionMinOrderByAggregateInput = {
    matchId?: SortOrder
    buyOrderId?: SortOrder
    sellOrderId?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    buyerId?: SortOrder
    sellerId?: SortOrder
    isBuyerMaker?: SortOrder
    status?: SortOrder
    settledAt?: SortOrder
  }

  export type MatchExecutionSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
  }

  export type EnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    isBuyerMaker?: SortOrder
    timestamp?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    isBuyerMaker?: SortOrder
    timestamp?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    symbol?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
    isBuyerMaker?: SortOrder
    timestamp?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    price?: SortOrder
    quantity?: SortOrder
    quoteQuantity?: SortOrder
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type EnumTransactionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryFilter<$PrismaModel> | $Enums.TransactionCategory
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type WalletScalarRelationFilter = {
    is?: WalletWhereInput
    isNot?: WalletWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    category?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    ticker?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    category?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    ticker?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    walletId?: SortOrder
    type?: SortOrder
    category?: SortOrder
    description?: SortOrder
    amount?: SortOrder
    balanceAfter?: SortOrder
    ticker?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    balanceAfter?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type EnumTransactionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TransactionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionCategoryFilter<$PrismaModel>
    _max?: NestedEnumTransactionCategoryFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type WalletCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type HoldingCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type WalletUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    connect?: WalletWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type HoldingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type WalletUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type HoldingUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutUserInput | HoldingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutUserInput | HoldingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutUserInput | HoldingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutUserInput | WatchlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutUserInput | WatchlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutUserInput | WatchlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type WalletUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    connectOrCreate?: WalletCreateOrConnectWithoutUserInput
    upsert?: WalletUpsertWithoutUserInput
    disconnect?: WalletWhereInput | boolean
    delete?: WalletWhereInput | boolean
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutUserInput, WalletUpdateWithoutUserInput>, WalletUncheckedUpdateWithoutUserInput>
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type HoldingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput> | HoldingCreateWithoutUserInput[] | HoldingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutUserInput | HoldingCreateOrConnectWithoutUserInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutUserInput | HoldingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HoldingCreateManyUserInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutUserInput | HoldingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutUserInput | HoldingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput> | WatchlistCreateWithoutUserInput[] | WatchlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutUserInput | WatchlistCreateOrConnectWithoutUserInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutUserInput | WatchlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WatchlistCreateManyUserInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutUserInput | WatchlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutUserInput | WatchlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type OrderCreateNestedManyWithoutStockInput = {
    create?: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput> | OrderCreateWithoutStockInput[] | OrderUncheckedCreateWithoutStockInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStockInput | OrderCreateOrConnectWithoutStockInput[]
    createMany?: OrderCreateManyStockInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type HoldingCreateNestedManyWithoutStockInput = {
    create?: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput> | HoldingCreateWithoutStockInput[] | HoldingUncheckedCreateWithoutStockInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutStockInput | HoldingCreateOrConnectWithoutStockInput[]
    createMany?: HoldingCreateManyStockInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type WatchlistCreateNestedManyWithoutStockInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type MarketQuoteCreateNestedOneWithoutStockInput = {
    create?: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
    connectOrCreate?: MarketQuoteCreateOrConnectWithoutStockInput
    connect?: MarketQuoteWhereUniqueInput
  }

  export type OrderUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput> | OrderCreateWithoutStockInput[] | OrderUncheckedCreateWithoutStockInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStockInput | OrderCreateOrConnectWithoutStockInput[]
    createMany?: OrderCreateManyStockInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type HoldingUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput> | HoldingCreateWithoutStockInput[] | HoldingUncheckedCreateWithoutStockInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutStockInput | HoldingCreateOrConnectWithoutStockInput[]
    createMany?: HoldingCreateManyStockInputEnvelope
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
  }

  export type WatchlistUncheckedCreateNestedManyWithoutStockInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
  }

  export type MarketQuoteUncheckedCreateNestedOneWithoutStockInput = {
    create?: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
    connectOrCreate?: MarketQuoteCreateOrConnectWithoutStockInput
    connect?: MarketQuoteWhereUniqueInput
  }

  export type EnumStockStatusFieldUpdateOperationsInput = {
    set?: $Enums.StockStatus
  }

  export type OrderUpdateManyWithoutStockNestedInput = {
    create?: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput> | OrderCreateWithoutStockInput[] | OrderUncheckedCreateWithoutStockInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStockInput | OrderCreateOrConnectWithoutStockInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutStockInput | OrderUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: OrderCreateManyStockInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutStockInput | OrderUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutStockInput | OrderUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type HoldingUpdateManyWithoutStockNestedInput = {
    create?: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput> | HoldingCreateWithoutStockInput[] | HoldingUncheckedCreateWithoutStockInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutStockInput | HoldingCreateOrConnectWithoutStockInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutStockInput | HoldingUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: HoldingCreateManyStockInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutStockInput | HoldingUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutStockInput | HoldingUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type WatchlistUpdateManyWithoutStockNestedInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutStockInput | WatchlistUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutStockInput | WatchlistUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutStockInput | WatchlistUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type MarketQuoteUpdateOneWithoutStockNestedInput = {
    create?: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
    connectOrCreate?: MarketQuoteCreateOrConnectWithoutStockInput
    upsert?: MarketQuoteUpsertWithoutStockInput
    disconnect?: MarketQuoteWhereInput | boolean
    delete?: MarketQuoteWhereInput | boolean
    connect?: MarketQuoteWhereUniqueInput
    update?: XOR<XOR<MarketQuoteUpdateToOneWithWhereWithoutStockInput, MarketQuoteUpdateWithoutStockInput>, MarketQuoteUncheckedUpdateWithoutStockInput>
  }

  export type OrderUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput> | OrderCreateWithoutStockInput[] | OrderUncheckedCreateWithoutStockInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutStockInput | OrderCreateOrConnectWithoutStockInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutStockInput | OrderUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: OrderCreateManyStockInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutStockInput | OrderUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutStockInput | OrderUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type HoldingUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput> | HoldingCreateWithoutStockInput[] | HoldingUncheckedCreateWithoutStockInput[]
    connectOrCreate?: HoldingCreateOrConnectWithoutStockInput | HoldingCreateOrConnectWithoutStockInput[]
    upsert?: HoldingUpsertWithWhereUniqueWithoutStockInput | HoldingUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: HoldingCreateManyStockInputEnvelope
    set?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    disconnect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    delete?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    connect?: HoldingWhereUniqueInput | HoldingWhereUniqueInput[]
    update?: HoldingUpdateWithWhereUniqueWithoutStockInput | HoldingUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: HoldingUpdateManyWithWhereWithoutStockInput | HoldingUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
  }

  export type WatchlistUncheckedUpdateManyWithoutStockNestedInput = {
    create?: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput> | WatchlistCreateWithoutStockInput[] | WatchlistUncheckedCreateWithoutStockInput[]
    connectOrCreate?: WatchlistCreateOrConnectWithoutStockInput | WatchlistCreateOrConnectWithoutStockInput[]
    upsert?: WatchlistUpsertWithWhereUniqueWithoutStockInput | WatchlistUpsertWithWhereUniqueWithoutStockInput[]
    createMany?: WatchlistCreateManyStockInputEnvelope
    set?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    disconnect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    delete?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    connect?: WatchlistWhereUniqueInput | WatchlistWhereUniqueInput[]
    update?: WatchlistUpdateWithWhereUniqueWithoutStockInput | WatchlistUpdateWithWhereUniqueWithoutStockInput[]
    updateMany?: WatchlistUpdateManyWithWhereWithoutStockInput | WatchlistUpdateManyWithWhereWithoutStockInput[]
    deleteMany?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
  }

  export type MarketQuoteUncheckedUpdateOneWithoutStockNestedInput = {
    create?: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
    connectOrCreate?: MarketQuoteCreateOrConnectWithoutStockInput
    upsert?: MarketQuoteUpsertWithoutStockInput
    disconnect?: MarketQuoteWhereInput | boolean
    delete?: MarketQuoteWhereInput | boolean
    connect?: MarketQuoteWhereUniqueInput
    update?: XOR<XOR<MarketQuoteUpdateToOneWithWhereWithoutStockInput, MarketQuoteUpdateWithoutStockInput>, MarketQuoteUncheckedUpdateWithoutStockInput>
  }

  export type StockCreateNestedOneWithoutQuoteInput = {
    create?: XOR<StockCreateWithoutQuoteInput, StockUncheckedCreateWithoutQuoteInput>
    connectOrCreate?: StockCreateOrConnectWithoutQuoteInput
    connect?: StockWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StockUpdateOneRequiredWithoutQuoteNestedInput = {
    create?: XOR<StockCreateWithoutQuoteInput, StockUncheckedCreateWithoutQuoteInput>
    connectOrCreate?: StockCreateOrConnectWithoutQuoteInput
    upsert?: StockUpsertWithoutQuoteInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutQuoteInput, StockUpdateWithoutQuoteInput>, StockUncheckedUpdateWithoutQuoteInput>
  }

  export type UserCreateNestedOneWithoutWalletInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutWalletNestedInput = {
    create?: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    connectOrCreate?: UserCreateOrConnectWithoutWalletInput
    upsert?: UserUpsertWithoutWalletInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWalletInput, UserUpdateWithoutWalletInput>, UserUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput> | TransactionCreateWithoutWalletInput[] | TransactionUncheckedCreateWithoutWalletInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutWalletInput | TransactionCreateOrConnectWithoutWalletInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutWalletInput | TransactionUpsertWithWhereUniqueWithoutWalletInput[]
    createMany?: TransactionCreateManyWalletInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutWalletInput | TransactionUpdateWithWhereUniqueWithoutWalletInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutWalletInput | TransactionUpdateManyWithWhereWithoutWalletInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldingsInput
    connect?: UserWhereUniqueInput
  }

  export type StockCreateNestedOneWithoutHoldingsInput = {
    create?: XOR<StockCreateWithoutHoldingsInput, StockUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: StockCreateOrConnectWithoutHoldingsInput
    connect?: StockWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHoldingsInput
    upsert?: UserUpsertWithoutHoldingsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHoldingsInput, UserUpdateWithoutHoldingsInput>, UserUncheckedUpdateWithoutHoldingsInput>
  }

  export type StockUpdateOneRequiredWithoutHoldingsNestedInput = {
    create?: XOR<StockCreateWithoutHoldingsInput, StockUncheckedCreateWithoutHoldingsInput>
    connectOrCreate?: StockCreateOrConnectWithoutHoldingsInput
    upsert?: StockUpsertWithoutHoldingsInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutHoldingsInput, StockUpdateWithoutHoldingsInput>, StockUncheckedUpdateWithoutHoldingsInput>
  }

  export type UserCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    connect?: UserWhereUniqueInput
  }

  export type StockCreateNestedOneWithoutWatchlistInput = {
    create?: XOR<StockCreateWithoutWatchlistInput, StockUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: StockCreateOrConnectWithoutWatchlistInput
    connect?: StockWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutWatchlistInput
    upsert?: UserUpsertWithoutWatchlistInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWatchlistInput, UserUpdateWithoutWatchlistInput>, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type StockUpdateOneRequiredWithoutWatchlistNestedInput = {
    create?: XOR<StockCreateWithoutWatchlistInput, StockUncheckedCreateWithoutWatchlistInput>
    connectOrCreate?: StockCreateOrConnectWithoutWatchlistInput
    upsert?: StockUpsertWithoutWatchlistInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutWatchlistInput, StockUpdateWithoutWatchlistInput>, StockUncheckedUpdateWithoutWatchlistInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type StockCreateNestedOneWithoutOrdersInput = {
    create?: XOR<StockCreateWithoutOrdersInput, StockUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: StockCreateOrConnectWithoutOrdersInput
    connect?: StockWhereUniqueInput
  }

  export type EnumOrderSideFieldUpdateOperationsInput = {
    set?: $Enums.OrderSide
  }

  export type EnumOrderTypeFieldUpdateOperationsInput = {
    set?: $Enums.OrderType
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type StockUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<StockCreateWithoutOrdersInput, StockUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: StockCreateOrConnectWithoutOrdersInput
    upsert?: StockUpsertWithoutOrdersInput
    connect?: StockWhereUniqueInput
    update?: XOR<XOR<StockUpdateToOneWithWhereWithoutOrdersInput, StockUpdateWithoutOrdersInput>, StockUncheckedUpdateWithoutOrdersInput>
  }

  export type EnumSettlementStatusFieldUpdateOperationsInput = {
    set?: $Enums.SettlementStatus
  }

  export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type EnumTransactionCategoryFieldUpdateOperationsInput = {
    set?: $Enums.TransactionCategory
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: WalletCreateOrConnectWithoutTransactionsInput
    upsert?: WalletUpsertWithoutTransactionsInput
    connect?: WalletWhereUniqueInput
    update?: XOR<XOR<WalletUpdateToOneWithWhereWithoutTransactionsInput, WalletUpdateWithoutTransactionsInput>, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumStockStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StockStatus | EnumStockStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStockStatusFilter<$PrismaModel> | $Enums.StockStatus
  }

  export type NestedEnumStockStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StockStatus | EnumStockStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StockStatus[] | ListEnumStockStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStockStatusWithAggregatesFilter<$PrismaModel> | $Enums.StockStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStockStatusFilter<$PrismaModel>
    _max?: NestedEnumStockStatusFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumOrderSideFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideFilter<$PrismaModel> | $Enums.OrderSide
  }

  export type NestedEnumOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeFilter<$PrismaModel> | $Enums.OrderType
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderSideWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderSide | EnumOrderSideFieldRefInput<$PrismaModel>
    in?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderSide[] | ListEnumOrderSideFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderSideWithAggregatesFilter<$PrismaModel> | $Enums.OrderSide
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderSideFilter<$PrismaModel>
    _max?: NestedEnumOrderSideFilter<$PrismaModel>
  }

  export type NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderType | EnumOrderTypeFieldRefInput<$PrismaModel>
    in?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderType[] | ListEnumOrderTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.OrderType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderTypeFilter<$PrismaModel>
    _max?: NestedEnumOrderTypeFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumSettlementStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusFilter<$PrismaModel> | $Enums.SettlementStatus
  }

  export type NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SettlementStatus | EnumSettlementStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SettlementStatus[] | ListEnumSettlementStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSettlementStatusWithAggregatesFilter<$PrismaModel> | $Enums.SettlementStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSettlementStatusFilter<$PrismaModel>
    _max?: NestedEnumSettlementStatusFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryFilter<$PrismaModel> | $Enums.TransactionCategory
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionType[] | ListEnumTransactionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionCategory | EnumTransactionCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TransactionCategory[] | ListEnumTransactionCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTransactionCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TransactionCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionCategoryFilter<$PrismaModel>
    _max?: NestedEnumTransactionCategoryFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WalletCreateWithoutUserInput = {
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
    transactions?: TransactionCreateNestedManyWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutUserInput = {
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
    transactions?: TransactionUncheckedCreateNestedManyWithoutWalletInput
  }

  export type WalletCreateOrConnectWithoutUserInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    stock: StockCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    symbol: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HoldingCreateWithoutUserInput = {
    id?: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
    stock: StockCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateWithoutUserInput = {
    id?: string
    symbol: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type HoldingCreateOrConnectWithoutUserInput = {
    where: HoldingWhereUniqueInput
    create: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput>
  }

  export type HoldingCreateManyUserInputEnvelope = {
    data: HoldingCreateManyUserInput | HoldingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    stock: StockCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistUncheckedCreateWithoutUserInput = {
    id?: string
    symbol: string
    createdAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput>
  }

  export type WatchlistCreateManyUserInputEnvelope = {
    data: WatchlistCreateManyUserInput | WatchlistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type WalletUpsertWithoutUserInput = {
    update: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
    create: XOR<WalletCreateWithoutUserInput, WalletUncheckedCreateWithoutUserInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutUserInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutUserInput, WalletUncheckedUpdateWithoutUserInput>
  }

  export type WalletUpdateWithoutUserInput = {
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUpdateManyWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutUserInput = {
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    transactions?: TransactionUncheckedUpdateManyWithoutWalletNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    userId?: StringFilter<"Order"> | string
    symbol?: StringFilter<"Order"> | string
    side?: EnumOrderSideFilter<"Order"> | $Enums.OrderSide
    orderType?: EnumOrderTypeFilter<"Order"> | $Enums.OrderType
    price?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    exchangeOrderId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type HoldingUpsertWithWhereUniqueWithoutUserInput = {
    where: HoldingWhereUniqueInput
    update: XOR<HoldingUpdateWithoutUserInput, HoldingUncheckedUpdateWithoutUserInput>
    create: XOR<HoldingCreateWithoutUserInput, HoldingUncheckedCreateWithoutUserInput>
  }

  export type HoldingUpdateWithWhereUniqueWithoutUserInput = {
    where: HoldingWhereUniqueInput
    data: XOR<HoldingUpdateWithoutUserInput, HoldingUncheckedUpdateWithoutUserInput>
  }

  export type HoldingUpdateManyWithWhereWithoutUserInput = {
    where: HoldingScalarWhereInput
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyWithoutUserInput>
  }

  export type HoldingScalarWhereInput = {
    AND?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    OR?: HoldingScalarWhereInput[]
    NOT?: HoldingScalarWhereInput | HoldingScalarWhereInput[]
    id?: StringFilter<"Holding"> | string
    userId?: StringFilter<"Holding"> | string
    symbol?: StringFilter<"Holding"> | string
    quantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFilter<"Holding"> | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFilter<"Holding"> | Date | string
  }

  export type WatchlistUpsertWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutUserInput, WatchlistUncheckedUpdateWithoutUserInput>
    create: XOR<WatchlistCreateWithoutUserInput, WatchlistUncheckedCreateWithoutUserInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutUserInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutUserInput, WatchlistUncheckedUpdateWithoutUserInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutUserInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutUserInput>
  }

  export type WatchlistScalarWhereInput = {
    AND?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    OR?: WatchlistScalarWhereInput[]
    NOT?: WatchlistScalarWhereInput | WatchlistScalarWhereInput[]
    id?: StringFilter<"Watchlist"> | string
    userId?: StringFilter<"Watchlist"> | string
    symbol?: StringFilter<"Watchlist"> | string
    createdAt?: DateTimeFilter<"Watchlist"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet?: WalletCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    watchlist?: WatchlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderCreateWithoutStockInput = {
    id?: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutStockInput = {
    id?: string
    userId: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutStockInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput>
  }

  export type OrderCreateManyStockInputEnvelope = {
    data: OrderCreateManyStockInput | OrderCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type HoldingCreateWithoutStockInput = {
    id?: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHoldingsInput
  }

  export type HoldingUncheckedCreateWithoutStockInput = {
    id?: string
    userId: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type HoldingCreateOrConnectWithoutStockInput = {
    where: HoldingWhereUniqueInput
    create: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput>
  }

  export type HoldingCreateManyStockInputEnvelope = {
    data: HoldingCreateManyStockInput | HoldingCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type WatchlistCreateWithoutStockInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutWatchlistInput
  }

  export type WatchlistUncheckedCreateWithoutStockInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type WatchlistCreateOrConnectWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    create: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput>
  }

  export type WatchlistCreateManyStockInputEnvelope = {
    data: WatchlistCreateManyStockInput | WatchlistCreateManyStockInput[]
    skipDuplicates?: boolean
  }

  export type MarketQuoteCreateWithoutStockInput = {
    price?: Decimal | DecimalJsLike | number | string
    previousClose?: Decimal | DecimalJsLike | number | string
    open?: Decimal | DecimalJsLike | number | string
    dayHigh?: Decimal | DecimalJsLike | number | string
    dayLow?: Decimal | DecimalJsLike | number | string
    volume?: Decimal | DecimalJsLike | number | string
    change?: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string
    isDelayed?: boolean
    updatedAt?: Date | string
  }

  export type MarketQuoteUncheckedCreateWithoutStockInput = {
    price?: Decimal | DecimalJsLike | number | string
    previousClose?: Decimal | DecimalJsLike | number | string
    open?: Decimal | DecimalJsLike | number | string
    dayHigh?: Decimal | DecimalJsLike | number | string
    dayLow?: Decimal | DecimalJsLike | number | string
    volume?: Decimal | DecimalJsLike | number | string
    change?: Decimal | DecimalJsLike | number | string
    changePercent?: Decimal | DecimalJsLike | number | string
    isDelayed?: boolean
    updatedAt?: Date | string
  }

  export type MarketQuoteCreateOrConnectWithoutStockInput = {
    where: MarketQuoteWhereUniqueInput
    create: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutStockInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutStockInput, OrderUncheckedUpdateWithoutStockInput>
    create: XOR<OrderCreateWithoutStockInput, OrderUncheckedCreateWithoutStockInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutStockInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutStockInput, OrderUncheckedUpdateWithoutStockInput>
  }

  export type OrderUpdateManyWithWhereWithoutStockInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutStockInput>
  }

  export type HoldingUpsertWithWhereUniqueWithoutStockInput = {
    where: HoldingWhereUniqueInput
    update: XOR<HoldingUpdateWithoutStockInput, HoldingUncheckedUpdateWithoutStockInput>
    create: XOR<HoldingCreateWithoutStockInput, HoldingUncheckedCreateWithoutStockInput>
  }

  export type HoldingUpdateWithWhereUniqueWithoutStockInput = {
    where: HoldingWhereUniqueInput
    data: XOR<HoldingUpdateWithoutStockInput, HoldingUncheckedUpdateWithoutStockInput>
  }

  export type HoldingUpdateManyWithWhereWithoutStockInput = {
    where: HoldingScalarWhereInput
    data: XOR<HoldingUpdateManyMutationInput, HoldingUncheckedUpdateManyWithoutStockInput>
  }

  export type WatchlistUpsertWithWhereUniqueWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    update: XOR<WatchlistUpdateWithoutStockInput, WatchlistUncheckedUpdateWithoutStockInput>
    create: XOR<WatchlistCreateWithoutStockInput, WatchlistUncheckedCreateWithoutStockInput>
  }

  export type WatchlistUpdateWithWhereUniqueWithoutStockInput = {
    where: WatchlistWhereUniqueInput
    data: XOR<WatchlistUpdateWithoutStockInput, WatchlistUncheckedUpdateWithoutStockInput>
  }

  export type WatchlistUpdateManyWithWhereWithoutStockInput = {
    where: WatchlistScalarWhereInput
    data: XOR<WatchlistUpdateManyMutationInput, WatchlistUncheckedUpdateManyWithoutStockInput>
  }

  export type MarketQuoteUpsertWithoutStockInput = {
    update: XOR<MarketQuoteUpdateWithoutStockInput, MarketQuoteUncheckedUpdateWithoutStockInput>
    create: XOR<MarketQuoteCreateWithoutStockInput, MarketQuoteUncheckedCreateWithoutStockInput>
    where?: MarketQuoteWhereInput
  }

  export type MarketQuoteUpdateToOneWithWhereWithoutStockInput = {
    where?: MarketQuoteWhereInput
    data: XOR<MarketQuoteUpdateWithoutStockInput, MarketQuoteUncheckedUpdateWithoutStockInput>
  }

  export type MarketQuoteUpdateWithoutStockInput = {
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketQuoteUncheckedUpdateWithoutStockInput = {
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    previousClose?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    open?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayHigh?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    dayLow?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    volume?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    change?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    changePercent?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isDelayed?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateWithoutQuoteInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutStockInput
    holdings?: HoldingCreateNestedManyWithoutStockInput
    watchlist?: WatchlistCreateNestedManyWithoutStockInput
  }

  export type StockUncheckedCreateWithoutQuoteInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutStockInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutStockInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutStockInput
  }

  export type StockCreateOrConnectWithoutQuoteInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutQuoteInput, StockUncheckedCreateWithoutQuoteInput>
  }

  export type StockUpsertWithoutQuoteInput = {
    update: XOR<StockUpdateWithoutQuoteInput, StockUncheckedUpdateWithoutQuoteInput>
    create: XOR<StockCreateWithoutQuoteInput, StockUncheckedCreateWithoutQuoteInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutQuoteInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutQuoteInput, StockUncheckedUpdateWithoutQuoteInput>
  }

  export type StockUpdateWithoutQuoteInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutStockNestedInput
    holdings?: HoldingUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUpdateManyWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutQuoteInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutStockNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
  }

  export type UserCreateWithoutWalletInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    watchlist?: WatchlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWalletInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWalletInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateWithoutWalletInput = {
    id?: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutWalletInput = {
    id?: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionCreateManyWalletInputEnvelope = {
    data: TransactionCreateManyWalletInput | TransactionCreateManyWalletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWalletInput = {
    update: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
    create: XOR<UserCreateWithoutWalletInput, UserUncheckedCreateWithoutWalletInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWalletInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWalletInput, UserUncheckedUpdateWithoutWalletInput>
  }

  export type UserUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
    create: XOR<TransactionCreateWithoutWalletInput, TransactionUncheckedCreateWithoutWalletInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutWalletInput, TransactionUncheckedUpdateWithoutWalletInput>
  }

  export type TransactionUpdateManyWithWhereWithoutWalletInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutWalletInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    walletId?: StringFilter<"Transaction"> | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    category?: EnumTransactionCategoryFilter<"Transaction"> | $Enums.TransactionCategory
    description?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    ticker?: StringNullableFilter<"Transaction"> | string | null
    quantity?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    price?: DecimalNullableFilter<"Transaction"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCreateWithoutHoldingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    watchlist?: WatchlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHoldingsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHoldingsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
  }

  export type StockCreateWithoutHoldingsInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutStockInput
    watchlist?: WatchlistCreateNestedManyWithoutStockInput
    quote?: MarketQuoteCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateWithoutHoldingsInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutStockInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutStockInput
    quote?: MarketQuoteUncheckedCreateNestedOneWithoutStockInput
  }

  export type StockCreateOrConnectWithoutHoldingsInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutHoldingsInput, StockUncheckedCreateWithoutHoldingsInput>
  }

  export type UserUpsertWithoutHoldingsInput = {
    update: XOR<UserUpdateWithoutHoldingsInput, UserUncheckedUpdateWithoutHoldingsInput>
    create: XOR<UserCreateWithoutHoldingsInput, UserUncheckedCreateWithoutHoldingsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHoldingsInput, UserUncheckedUpdateWithoutHoldingsInput>
  }

  export type UserUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHoldingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StockUpsertWithoutHoldingsInput = {
    update: XOR<StockUpdateWithoutHoldingsInput, StockUncheckedUpdateWithoutHoldingsInput>
    create: XOR<StockCreateWithoutHoldingsInput, StockUncheckedCreateWithoutHoldingsInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutHoldingsInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutHoldingsInput, StockUncheckedUpdateWithoutHoldingsInput>
  }

  export type StockUpdateWithoutHoldingsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUpdateOneWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutHoldingsInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUncheckedUpdateOneWithoutStockNestedInput
  }

  export type UserCreateWithoutWatchlistInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    orders?: OrderCreateNestedManyWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWatchlistInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWatchlistInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
  }

  export type StockCreateWithoutWatchlistInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderCreateNestedManyWithoutStockInput
    holdings?: HoldingCreateNestedManyWithoutStockInput
    quote?: MarketQuoteCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateWithoutWatchlistInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutStockInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutStockInput
    quote?: MarketQuoteUncheckedCreateNestedOneWithoutStockInput
  }

  export type StockCreateOrConnectWithoutWatchlistInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutWatchlistInput, StockUncheckedCreateWithoutWatchlistInput>
  }

  export type UserUpsertWithoutWatchlistInput = {
    update: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
    create: XOR<UserCreateWithoutWatchlistInput, UserUncheckedCreateWithoutWatchlistInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWatchlistInput, UserUncheckedUpdateWithoutWatchlistInput>
  }

  export type UserUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    orders?: OrderUpdateManyWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWatchlistInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StockUpsertWithoutWatchlistInput = {
    update: XOR<StockUpdateWithoutWatchlistInput, StockUncheckedUpdateWithoutWatchlistInput>
    create: XOR<StockCreateWithoutWatchlistInput, StockUncheckedCreateWithoutWatchlistInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutWatchlistInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutWatchlistInput, StockUncheckedUpdateWithoutWatchlistInput>
  }

  export type StockUpdateWithoutWatchlistInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutStockNestedInput
    holdings?: HoldingUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUpdateOneWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutWatchlistInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutStockNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUncheckedUpdateOneWithoutStockNestedInput
  }

  export type UserCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    wallet?: WalletCreateNestedOneWithoutUserInput
    holdings?: HoldingCreateNestedManyWithoutUserInput
    watchlist?: WatchlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    wallet?: WalletUncheckedCreateNestedOneWithoutUserInput
    holdings?: HoldingUncheckedCreateNestedManyWithoutUserInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type StockCreateWithoutOrdersInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingCreateNestedManyWithoutStockInput
    watchlist?: WatchlistCreateNestedManyWithoutStockInput
    quote?: MarketQuoteCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateWithoutOrdersInput = {
    symbol: string
    companyName: string
    sector?: string | null
    status?: $Enums.StockStatus
    baseAsset: string
    quoteAsset?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    holdings?: HoldingUncheckedCreateNestedManyWithoutStockInput
    watchlist?: WatchlistUncheckedCreateNestedManyWithoutStockInput
    quote?: MarketQuoteUncheckedCreateNestedOneWithoutStockInput
  }

  export type StockCreateOrConnectWithoutOrdersInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutOrdersInput, StockUncheckedCreateWithoutOrdersInput>
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    wallet?: WalletUpdateOneWithoutUserNestedInput
    holdings?: HoldingUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    wallet?: WalletUncheckedUpdateOneWithoutUserNestedInput
    holdings?: HoldingUncheckedUpdateManyWithoutUserNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StockUpsertWithoutOrdersInput = {
    update: XOR<StockUpdateWithoutOrdersInput, StockUncheckedUpdateWithoutOrdersInput>
    create: XOR<StockCreateWithoutOrdersInput, StockUncheckedCreateWithoutOrdersInput>
    where?: StockWhereInput
  }

  export type StockUpdateToOneWithWhereWithoutOrdersInput = {
    where?: StockWhereInput
    data: XOR<StockUpdateWithoutOrdersInput, StockUncheckedUpdateWithoutOrdersInput>
  }

  export type StockUpdateWithoutOrdersInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUpdateOneWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutOrdersInput = {
    symbol?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    sector?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStockStatusFieldUpdateOperationsInput | $Enums.StockStatus
    baseAsset?: StringFieldUpdateOperationsInput | string
    quoteAsset?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    holdings?: HoldingUncheckedUpdateManyWithoutStockNestedInput
    watchlist?: WatchlistUncheckedUpdateManyWithoutStockNestedInput
    quote?: MarketQuoteUncheckedUpdateOneWithoutStockNestedInput
  }

  export type WalletCreateWithoutTransactionsInput = {
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
    user: UserCreateNestedOneWithoutWalletInput
  }

  export type WalletUncheckedCreateWithoutTransactionsInput = {
    userId: string
    balance?: Decimal | DecimalJsLike | number | string
    lockedBalance?: Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string | null
  }

  export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: WalletWhereUniqueInput
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
  }

  export type WalletUpsertWithoutTransactionsInput = {
    update: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
    create: XOR<WalletCreateWithoutTransactionsInput, WalletUncheckedCreateWithoutTransactionsInput>
    where?: WalletWhereInput
  }

  export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: WalletWhereInput
    data: XOR<WalletUpdateWithoutTransactionsInput, WalletUncheckedUpdateWithoutTransactionsInput>
  }

  export type WalletUpdateWithoutTransactionsInput = {
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutWalletNestedInput
  }

  export type WalletUncheckedUpdateWithoutTransactionsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedBalance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    assetsHeld?: JsonNullValueInput | InputJsonValue
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type OrderCreateManyUserInput = {
    id?: string
    symbol: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingCreateManyUserInput = {
    id?: string
    symbol: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateManyUserInput = {
    id?: string
    symbol: string
    createdAt?: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyStockInput = {
    id?: string
    userId: string
    side: $Enums.OrderSide
    orderType: $Enums.OrderType
    price: Decimal | DecimalJsLike | number | string
    quantity: Decimal | DecimalJsLike | number | string
    filledQty?: Decimal | DecimalJsLike | number | string
    remainingQty: Decimal | DecimalJsLike | number | string
    averageFillPrice?: Decimal | DecimalJsLike | number | string
    status?: $Enums.OrderStatus
    exchangeOrderId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HoldingCreateManyStockInput = {
    id?: string
    userId: string
    quantity?: Decimal | DecimalJsLike | number | string
    lockedQuantity?: Decimal | DecimalJsLike | number | string
    averageCost?: Decimal | DecimalJsLike | number | string
    realizedPnl?: Decimal | DecimalJsLike | number | string
    updatedAt?: Date | string
  }

  export type WatchlistCreateManyStockInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    side?: EnumOrderSideFieldUpdateOperationsInput | $Enums.OrderSide
    orderType?: EnumOrderTypeFieldUpdateOperationsInput | $Enums.OrderType
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    filledQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    remainingQty?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageFillPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    exchangeOrderId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHoldingsNestedInput
  }

  export type HoldingUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HoldingUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    lockedQuantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    averageCost?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    realizedPnl?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWatchlistNestedInput
  }

  export type WatchlistUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WatchlistUncheckedUpdateManyWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyWalletInput = {
    id?: string
    type: $Enums.TransactionType
    category: $Enums.TransactionCategory
    description: string
    amount: Decimal | DecimalJsLike | number | string
    balanceAfter: Decimal | DecimalJsLike | number | string
    ticker?: string | null
    quantity?: Decimal | DecimalJsLike | number | string | null
    price?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    category?: EnumTransactionCategoryFieldUpdateOperationsInput | $Enums.TransactionCategory
    description?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    balanceAfter?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    ticker?: NullableStringFieldUpdateOperationsInput | string | null
    quantity?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    price?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}