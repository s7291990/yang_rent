declare global {
  interface Window {
    daum: any;
  }
}
declare module "@portone/browser-sdk/v2" {
  export function requestIdentityVerification(params: any): void;
}
interface Window {
  SmartroPay?: {
    pay: (params: any) => void;
  };
}
export { };