import { Navbar } from '@/components/molecules/Navbar';
import { ToastContainer } from 'react-toastify';

const MainPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
        <ToastContainer />
      </main>
    </>
  );
};

export default MainPageLayout;
