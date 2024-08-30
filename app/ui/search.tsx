'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {

  // 1.获取地址栏参数
  const searchParams = useSearchParams();
  // 2.读取当前 URL 的路径名
  const pathname = usePathname();
  // 3.用于路由替换
  const { replace } = useRouter();

  // useDebouncedCallback: 防抖函数  pnpm i use-debounce
  const handleSearch = useDebouncedCallback((term: string) => {
    // 4.将原本的地址栏参数构造到URLSearchParams对象
    // URLSearchParams 是一个 Web API，它提供用于操作 URL 查询参数的实用方法。你可以使用它来获取 params 字符串，而不是创建复杂的字符串文本，如 ?page=1&query=a。
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // 5.页面路由跳转，并携带参数
    replace(`${pathname}?${params.toString()}`);
  },300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          // 同步搜索值
          defaultValue={searchParams.get('query')?.toString()}

      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
