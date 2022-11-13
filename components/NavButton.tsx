

const NavButton: React.FC<{ title: string, isActive?: boolean, OnClick?: () => void }> = ({ title, isActive, OnClick }) => {
    return (
        <button className={`${isActive && 'bg-[#036756]'} text-white py-2 px-4 rounded-lg`} onClick={OnClick}>{title}</button>
    )
}

export default NavButton