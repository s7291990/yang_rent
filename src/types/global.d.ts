declare global {
  interface Window {
    daum: Record<string, unknown>;
  }
}
declare module "@portone/browser-sdk/v2" {
  export function requestIdentityVerification(params: Record<string, unknown>): void;
}
interface Window {
  SmartroPay?: {
    pay: (params: Record<string, unknown>) => void;
  };
}
export { };