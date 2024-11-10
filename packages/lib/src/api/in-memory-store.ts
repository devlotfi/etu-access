export class InMemoryStore {
  private static _accessToken?: string | undefined;
  public static get accessToken(): string | undefined {
    return InMemoryStore._accessToken;
  }
  public static set accessToken(value: string | undefined) {
    InMemoryStore._accessToken = value;
  }

  private static _refreshToken?: string | undefined;
  public static get refreshToken(): string | undefined {
    return InMemoryStore._refreshToken;
  }
  public static set refreshToken(value: string | undefined) {
    InMemoryStore._refreshToken = value;
  }
}
