'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  message: string;
}

export default function Redirect({ message }: Props) {
  const router = useRouter();

  useEffect(() => {
    alert(message);
    router.back();
  }, []);

  return <></>;
}
