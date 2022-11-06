

const NavButton: React.FC<{ title: string, isActive?: boolean }> = ({ title, isActive }) => {
    return (
        <button className={`${isActive && 'bg-[#036756]'} text-white py-2 px-4 rounded-lg`}>{title}</button>
    )
}

export default NavButton