declare global {
  interface Window {
    daum: Record<string, unknown>;
    SmartroPay?: {
      pay: (params: Record<string, unknown>) => void;
    };
  }
}

declare module "@portone/browser-sdk/v2" {
  export function requestIdentityVerification(params: Record<string, unknown>): void;
}

export { };