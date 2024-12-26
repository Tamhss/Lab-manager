type TitlePage = {
  label: string;
};

const HeaderFooterBar = ({ children, titlePage }: { children?: React.ReactNode; titlePage?: TitlePage }) => {
  return (
    <div className="flex items-center h-16 w-full bg-primary p-4 gap-6">
      <div className="flex-shrink-0 text-white font-bold">{titlePage?.label}</div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default HeaderFooterBar;
