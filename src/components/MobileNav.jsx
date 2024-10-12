import { NavLink } from "react-router-dom"
import { mobileNav } from "../constans"


function MobileNav() {




    return (

        <section className="lg:hidden h-14 w-full bg-black bg-opacity-75 backdrop-blur-sm fixed bottom-0 z-40">
            <div className="flex items-center justify-evenly h-full text-neutral-500">
                {
                    mobileNav.map(nav => (
                        <NavLink key={nav.label + 'mobileNav'} to={nav.href}
                            className={({isActive}) => `transition-all flex flex-col items-center px-3 h-full justify-center text-neutral-300/50 ${isActive && '!text-white'}`}>

                            <div className="text-2xl">
                                {nav.icon}
                            </div>
                            <p className="text-sm">
                                {nav.label}
                            </p>
                        </NavLink>
                    ))
                }
            </div>
        </section>
    )
}

export default MobileNav