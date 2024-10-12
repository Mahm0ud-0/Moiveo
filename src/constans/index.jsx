import { GrHomeRounded } from "react-icons/gr";
import { LuTv } from "react-icons/lu";
import { RiMovie2Line } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5"





export const navigation = [
    {
        label: "TV Shows",
        href: "tv",
        icon: <LuTv />
    },
    {
        label: "Movies",
        href: "movie",
        icon: <RiMovie2Line />
    }
]

export const mobileNav = [
    {
        label: 'Home',
        href: '/',
        icon: <GrHomeRounded />
    },
    ...navigation,
    {
        label: 'Search',
        href: '/search',
        icon: <IoSearchOutline />
    }
]
