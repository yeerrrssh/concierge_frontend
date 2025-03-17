type TabProps = {
  changeToggle: () => void;
  title: string;
  isSelected: boolean;
};

export const Tab = ({ changeToggle, title, isSelected }: TabProps) => {
  return (
    <button
      className={`w-[114px] h-[34px] font-medium text-sm rounded-lg ${isSelected ? 'text-surface-50 bg-purple' : ' text-surface-300 bg-surface-150'}`}
      onClick={changeToggle}
    >
      {title}
    </button>
  );
};
