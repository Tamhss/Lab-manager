import { FormLogin } from '@/components/molecules/FormLogin';
import { Props } from '@/types';

const Page = async ({ params }: Props) => {
  return (
    <main>
      <div className="mx-auto">
        <FormLogin />
      </div>
    </main>
  );
};

export default Page;


