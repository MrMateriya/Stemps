import React, {ReactElement} from 'react';
import Link from "next/link";
import {Button, Icon} from "@/UI";

const Header = ({...props}) : ReactElement => {
    const links = [
        {
            id: 0,
            title: "О школе",
            href: "#",
        },
        {
            id: 1,
            title: "Курсы",
            href: "#",
        },
        {
            id: 2,
            title: "Библиотека",
            href: "#",
        },
    ]

    return (
        <header className="border-solid border-0 border-b border-light-gray2" {...props}>
            <div className="app-container flex items-center justify-between py-4 pb-[15px] lg:grid grid-cols-[428px_1fr]">
                <div className="flex items-center justify-start space-x-4">
                    <Link href="/" className="w-7 h-7 border border-solid border-dark-gray rounded-[5px] bg-dark-gray flex items-center justify-center">
                        <svg className="w-[14px] h-[14px] desktop:h-[16px] fill-white" width="53" height="60" viewBox="0 0 53 60"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M32.3277 2.76376C22.0896 -2.99153 8.93388 0.532462 2.94351 10.6348C-3.04686 20.7372 0.396599 33.5923 10.6347 39.3476L13.9334 41.202L13.9334 60L31.3759 60C43.0418 60 52.4988 50.5429 52.4988 38.8771C52.4988 30.9481 48.1301 24.0395 41.6685 20.4271L47.1887 11.1177L32.3277 2.76376ZM41.6685 20.4271C38.6231 18.7245 35.1128 17.7541 31.3759 17.7541L13.9334 17.7541L13.9334 41.202L25.4956 47.7016L41.6685 20.4271Z"/>
                        </svg>
                    </Link>
                    <p className="hidden lg:block text-bl2 uppercase desktop:tracking-[0.5px]">STEMPS</p>
                </div>
                <div className="lg:flex lg:justify-between lg:items-center">
                    <ul className="hidden lg:flex space-x-6">
                        {links.map((item) => (
                          <li key={item.id}>
                              <Link className="text-bl2 desktop:tracking-[0.5px]" href={item.href}>
                                  {item.title}
                              </Link>
                          </li>
                        ))}
                    </ul>
                    <Link href="#" className="hidden lg:flex lg:items-center desktop:tracking-[0.5px] text-bl2 gap-4">
                        Вход
                        <Icon className="flex-shrink-0 w-[30px] h-7" width="30" height="28" spriteHref="/images/icons/iconAtlases/size_60.svg" iconName="ExitIcon"/>
                    </Link>
                </div>
                <Button variant="filled" className="text-white lg:hidden leading-[115%]">
                    Меню
                </Button>
            </div>
        </header>
    );
};

export default Header;