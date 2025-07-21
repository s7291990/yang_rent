declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
      }) => { open: () => void };
    };
    SmartroPay?: {
      pay: (params: Record<string, unknown>) => void;
    };
  }
}

declare module "@portone/browser-sdk/v2" {
  export function requestIdentityVerification(params: Record<string, unknown>): void;
  // 아래를 추가하세요!
  interface PaymentRequest {
    onSuccess?: (res: any) => void;
    onError?: (err: any) => void;
  }
}

export { };