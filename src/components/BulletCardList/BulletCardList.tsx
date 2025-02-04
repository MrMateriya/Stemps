"use client"

import React, {useState} from 'react';
import {Card} from "@/UI/types";
import {Bullets, CardList} from "@/UI";

interface BulletCardListProps {
  classNames?: {
    bullets?: string,
    cardList?: string,
  }
}

const BulletCardList = ({ classNames }: BulletCardListProps): React.JSX.Element => {
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
        title: "desktop:leading-[115%]",
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

  function handleChangeBullet(index: number) : void {
    console.log("handleCLickBullet: index dot", index)
    setCurrentSlideIndex(index)
  }
  function onChangeCard(index: number) : void {
    console.log("onChangeCard: index slide", index)
    setCurrentSlideIndex(index)
  }

  return (
    <div>
      <Bullets className={classNames?.bullets} onChangeBullet={handleChangeBullet} amount={cards.length} startBulletIndex={currentSlideIndex}/>
      <CardList className={classNames?.cardList} cards={cards} onChangeCard={onChangeCard} startCardIndex={currentSlideIndex}/>
    </div>
  );
};

export default BulletCardList;