import React from 'react';
import BulletCardList from "@/components/BulletCardList/BulletCardList";

const Home = ({...props}) : React.JSX.Element => {
    return (
      <main className="app-container" {...props}>
          <div className="mt-[7px] mb-10 lg:grid grid-cols-[428px_1fr] lg:border-b-[1px] lg:border-solid lg:border-middle-gray lg:m-0 lg:mb-5 lg:py-3 lg:pb-[11px]">
              <p className="text-2.5xl mb-[7px] text-violet-dark leading-[108%] lg:m-0 lg:text-[40px] desktop:text-violet-saturated">1.0</p>
              <div className="h-px bg-middle-gray w-full lg:hidden"></div>
              <h1 className="mt-2 text-2.5xl text-violet-dark leading-[108%] lg:m-0 lg:text-[40px] desktop:tracking-[0.3px] desktop:text-violet-saturated">Наши услуги</h1>
          </div>
          <BulletCardList classNames={{bullets: "mb-6 lg:hidden"}}/>
      </main>
    );
};

export default Home;