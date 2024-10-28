
interface SubMenuProps {
  menuItemsSearch: string[];
  onClickItem: (item: string) => void;
}

export default function SubMenu({ menuItemsSearch, onClickItem }: SubMenuProps) {
  return (
    <div className="absolute top-20 left-35 bg-[#1E1E24] text-white flex flex-col items-start py-2 px-4 rounded-sm z-50">
      {menuItemsSearch.map((item) => (
        <button
          key={item}
          className="w-full text-left px-4 py-2 bg-[#33333D] hover:bg-[#44444F] rounded my-1"
          onClick={() => onClickItem(item)} 
        >
          {item}
        </button>
      ))}
    </div>
  );
}
