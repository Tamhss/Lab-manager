import { Props } from '@/types/global';

type ParamsProps = {
  id: string;
};

type SearchParams = {
  page: string;
};

const Page = async ({ params, searchParams }: Props<ParamsProps, SearchParams>) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div>Customer: {params.id}</div>
        <div>Page {searchParams?.page}</div>
      </div>
    </main>
  );
};

export default Page;
