"use client";
import React, {useState} from 'react';
import {Bullets, CardList} from "@/UI";
import {Card} from "@/UI/types";

const Home = ({...props}) : React.JSX.Element => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(3);

    const cards : Card[] = [
        {
            id: 0,
            title: "Анализ текущего состояния карьеры",
            icon: {
                iconName: "AnalyticCircleIcon",
                iconWidth: 60,
                iconHeight: 60,
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Проведем оценку вашего кейса и создадим <br/> стратегию для дальнейшего карьерного <br/> развития.",
            classNames: {
                title: "leading-[115%] tracking-[0.1px]",
                description: "leading-[140%] tracking-[0.4px]",
            }
        },
        {
            id: 1,
            title: "Сопроводительные письма и резюме",
            icon: {
                iconName: "DocumentsSquareIcon",
                iconWidth: 60,
                iconHeight: 60,
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Поможем сформировать профессиональный портфель, которые выделит вас среди других кандидатов.",
            classNames: {
                description: "leading-[135%] tracking-[0.4px]",
            }
        },
        {
            id: 2,
            title: "Поиск работы",
            icon: {
                iconName: "SearchWorkIcon",
                iconWidth: 60,
                iconHeight: 60,
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Определим вашу карьерную цель и разработаем стратегию для трудоустройства.",
            classNames: {
                title: "leading-[115%] tracking-[0.1px]",
                description: "leading-[140%] tracking-[0.4px]",
            }
        },
        {
            id: 3,
            title: "Тренинг по презентации личного бренда",
            icon: {
                iconName: "TrainingCircleIcon",
                iconWidth: 60,
                iconHeight: 60,
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Подсветим сильные стороны <br/> и грамотно выстроим самопрезентацию.",
            classNames: {
                title: "leading-[119%] tracking-[0.2px]",
                description: "leading-[140%] tracking-[0.4px]",
            }
        },
        {
            id: 4,
            title: "Подготовка к собеседованию",
            icon: {
                iconName: "ChatIcon",
                iconWidth: 60,
                iconHeight: 60,
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Научим говорить о себе кратко, <br/> ярко и профессионально.",
            classNames: {
                title: "leading-[115%] tracking-[0.2px]",
                description: "leading-[140%] tracking-[0.4px]",
            }
        },
        {
            id: 5,
            title: "Рекомендация по базе STEMPS Career",
            icon: {
                iconName: "LogoIcon",
                spriteHref: "/images/icons/iconAtlases/size_60.svg",
            },
            description: "Поможем встретиться соискателю <br/> и работодателю.",
            classNames: {
                icon: "w-[52px] h-[60px] lg:w-[70px]",
                title: "leading-[115%] tracking-[0.3px]",
                description: "leading-[140%] tracking-[0.4px]",
            }
        },
    ]

    function handleCLickBullet(index: number) : void {
        // console.log("handleCLickBullet: index dot", index)
        setCurrentSlideIndex(index)
    }
    function onChangeCard(index: number) : void {
        console.log("onChangeCard: index slide", index)
        setCurrentSlideIndex(index)
    }

    return (
      <main className="app-container" {...props}>
          <div className="mt-[7px] mb-10 lg:grid grid-cols-[428px_1fr] lg:border-b-[1px] lg:border-solid lg:border-middle-gray lg:m-0 lg:mb-5 lg:py-3 lg:pb-[11px]">
              <p className="text-2.5xl mb-[7px] text-violet-dark leading-[108%] lg:m-0 lg:text-[40px]">1.0</p>
              <div className="h-px bg-middle-gray w-full lg:hidden"></div>
              <h1 className="mt-2 text-2.5xl text-violet-dark leading-[108%] lg:m-0 lg:text-[40px]">Наши услуги</h1>
          </div>
          <Bullets className="mb-6 lg:hidden" onClickBullet={handleCLickBullet} amount={cards.length} currentBulletIndex={currentSlideIndex}/>
          <CardList cards={cards} onChangeCard={onChangeCard} currentCardIndex={currentSlideIndex}/>
      </main>
    );
};

export default Home;