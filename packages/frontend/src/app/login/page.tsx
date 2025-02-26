import SignIn from "@/components/molecules/FormLogin";
import { Props } from '@/types';

const Page = async ({ params }: Props) => {
  return (
    <main>
      <div className="mx-auto">
        <SignIn />
      </div>
    </main>
  );
};

export default Page;


