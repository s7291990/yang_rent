'use client';
import React, { useEffect, useState } from 'react';
import { FormItem } from '@/components/common';

interface DaumPostcodeData {
  address: string;
  addressType: string;
  bname: string;
  buildingCode: string;
  buildingName: string;
  // ...필요한 필드만 추가
}

export default function AddressSearch({ onChange }: { onChange: (addr: string) => void }) {
  const [address, setAddress] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputClick = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function (data: DaumPostcodeData) {
          setAddress(data.address);
          if (onChange) onChange(data.address); // 상위로 전달
        },
      }).open();
    }
  };
  return (
    <FormItem
      label="주소"
      placeholder="주소를 선택하세요"
      type="text"
      name="address"
      onClick={handleInputClick}
      value={address}
      readonly={true}
      onChange={(e) => setAddress(e.target.value)}
    />
  );
}

export { };