'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const tabs = [
  {
    id: 1,
    title: '전체',
    href: '/user/my/myposts',
  },
  {
    id: 2,
    title: '공개',
    href: '/user/my/myposts/public',
  },
  {
    id: 3,
    title: '비공개',
    href: '/user/my/myposts/private',
  },
];

export default function MyPostsTabs() {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);

  useEffect(() => {
    const tab = tabs.find((tab) => tab.href === pathname);
    if (tab) {
      setSelectedTab(tab.title);
    }
  }, [pathname]);

  return (
    <div className='w-full h-full flex justify-center'>
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`basis-1/3 text-center ${
            selectedTab === tab.title ? 'font-bold text-green-700' : ''
          }`}
          onClick={() => setSelectedTab(tab.title)}
        >
          <div className='py-2'>
            <span className='font-semibold'>{tab.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
