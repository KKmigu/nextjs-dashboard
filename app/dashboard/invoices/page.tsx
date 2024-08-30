import Pagination from '@/app/ui/invoices/pagination';
import { fetchInvoicesPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import {CreateInvoice} from '@/app/ui/invoices/buttons';
import {lusitana} from '@/app/ui/fonts';
import {InvoicesTableSkeleton} from '@/app/ui/skeletons';
import {Suspense} from 'react';
// 在函数定义中，{searchParams}: { searchParams?: { query?: string; page?: string; }; }
// 表示函数 Page 接受一个包含 searchParams 属性的对象，该属性是一个可选的对象，包含 query 和 page 属性，它们的值都是字符串类型。
export default async function Page({searchParams,}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  console.log(searchParams)
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search invoices..."/>
          <CreateInvoice/>
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton/>}>
          <Table query={query} currentPage={currentPage}/>
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
           <Pagination totalPages={totalPages} />
        </div>
      </div>
  );
}