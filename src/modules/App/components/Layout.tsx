import { Pages } from './Pages.tsx';

export const Layout = () => {
  return (
    <div className="min-h-screen min-w-full flex relative bg-surface-100">
      <div className="absolute right-0 flex flex-col px-6 py-3 justify-center items-center h-fit bg-surface-50 rounded-bl-2xl">
        <img className="w-14 h-14" src="/logo.png" alt="Logo" />
        <p className="text-[10px] font-medium mt-0 mb-1">Цифровой консьерж</p>
      </div>
      <Pages />
    </div>
  );
};
