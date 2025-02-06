"use client";

import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Card} from "@/UI/types";
import {animate} from "framer-motion";
import {Icon} from "@/UI";
import {useWindowSize} from "@/hooks/useWindowSize";

interface CardListProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: Card[],
  startCardIndex?: number,
  onChangeCard?: (index: number) => void,
}

const CardList = ({
                    cards, startCardIndex = 0, className, onChangeCard,
                    ...props
                  }: CardListProps): React.JSX.Element => {
  const list = useRef<HTMLDivElement>(null)
  let isPlayingAnimation = useRef<boolean>(false)
  const { width: windowWidth } = useWindowSize()

  let gap = 16;
  const [widthCard, setWidthCard ] = useState<number>(358)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const alignmentCardThreshold: number = widthCard / 2;

  let startScrollLeft: number = 0;
  let startX: number;
  let difference: number = 0;
  let scrollSpeed: number = 0.5;
  let isScrolling = false;

  function handleScrolling(e: React.TouchEvent | React.MouseEvent) {
    if (!list.current || !isScrolling || isPlayingAnimation.current) return;

    if (e.type === 'touchmove') {
      difference = (e as React.TouchEvent).changedTouches[0].clientX - startX;
    } else if (e.type === 'mousemove') {
      e.preventDefault()
      difference = (e as React.MouseEvent).clientX - startX;
    }
    list.current.scrollLeft = startScrollLeft - (difference * scrollSpeed);
  }

  function handleScrollingStart(e: React.TouchEvent | React.MouseEvent) {
    if (!list.current || isPlayingAnimation.current) return;

    isScrolling = true;
    if (e.type === 'touchstart') {
      startX = (e as React.TouchEvent).changedTouches[0].clientX;
    } else if (e.type === 'mousedown') {
      e.preventDefault()
      startX = (e as React.MouseEvent).clientX;
    }
    startScrollLeft = list.current.scrollLeft;
  }

  function handleScrollingEnd(e: React.MouseEvent | React.TouchEvent) {
    if (!list.current || !isScrolling || isPlayingAnimation.current) return;
    isScrolling = false;

    const fullScrollLeft = list.current.scrollWidth - list.current.clientWidth
    const cardsOffsetLeft = []

    if (e.currentTarget.scrollLeft === fullScrollLeft) {
      if (cards.length === 0) {
        if (onChangeCard) onChangeCard(0)
        Animating(0)
        setCurrentCardIndex(0)
        return;
      }
      if (currentCardIndex === cards.length - 1) {
        Animating(cards.length - 1)
        return;
      }
      if (onChangeCard) onChangeCard(cards.length - 1);
      Animating(cards.length - 1)
      setCurrentCardIndex(cards.length - 1)
      return;
    }

    for (let i = 0; i < cards.length; i++) {
      if (i === 0) {
        cardsOffsetLeft[i] = calculateScrollLeft(i)
        continue;
      }
      cardsOffsetLeft[i] = calculateScrollLeft(i) - alignmentCardThreshold
    }

    for (let i = 0; i < cardsOffsetLeft.length; i++) {
      if (e.currentTarget.scrollLeft >= cardsOffsetLeft[i] && e.currentTarget.scrollLeft < cardsOffsetLeft[i+1] && cardsOffsetLeft[i+1]) {
        if (currentCardIndex === i) {
          Animating(i)
          return;
        }
        if (onChangeCard) onChangeCard(i);
        Animating(i)
        setCurrentCardIndex(i)
      } else if (e.currentTarget.scrollLeft > cardsOffsetLeft[i] && i === cardsOffsetLeft.length - 1) {
        if (currentCardIndex === i) {
          Animating(i)
          return;
        }
        if (onChangeCard) onChangeCard(i);
        Animating(i)
        setCurrentCardIndex(i)
      }
    }
  }

  function calculateScrollLeft(slideIndex: number) {
    if (!list.current) return 0;
    if (!cards[slideIndex]) {
     throw new Error(`currentSlideIndex must be in the range i: ${slideIndex}`);
    }

    return (widthCard * slideIndex + gap * slideIndex);
  }

  function Animating(index: number) {
    if (!list.current) return;
    isPlayingAnimation.current = true

    let toScrollLeft = calculateScrollLeft(index)
    const fullScrollLeft = list.current.scrollWidth - list.current.clientWidth

    if (toScrollLeft >= fullScrollLeft) {
      toScrollLeft = fullScrollLeft
    }

    return animate(list.current.scrollLeft, toScrollLeft, {
      ease: "easeInOut",
      duration: 1,
      onUpdate: (latest: number) => {
        if (!list.current) return;
        list.current.scrollLeft = latest;
      },
      onComplete: () => {
        isPlayingAnimation.current = false
      },
    })
  }

  useEffect(() => {
    const controls = Animating(startCardIndex)
    if (currentCardIndex !== startCardIndex) {
      setCurrentCardIndex(startCardIndex)
    }

    return () => controls?.stop()
  }, [startCardIndex]);

  useLayoutEffect(() => {
    if (!windowWidth) return;
    if (windowWidth >= Number(process.env.NEXT_PUBLIC_SCREEN_LG)) {
      setWidthCard(412)
    } else {
      setWidthCard(358)
    }
  }, [windowWidth]);

  return (
    <div ref={list}
         onTouchMove={handleScrolling}
         onTouchStart={handleScrollingStart}
         onTouchEnd={handleScrollingEnd}

         onMouseMove={handleScrolling}
         onMouseUp={handleScrollingEnd}
         onMouseLeave={handleScrollingEnd}
         onMouseDown={handleScrollingStart}
         className={["flex overflow-x-hidden space-x-4 select-none", className].join(" ")}
         {...props}>
      {cards.map((card, index) => {
        return (
          <div key={card.id}
               className={["relative flex flex-col justify-between p-4 bg-light-gray rounded-lg min-h-[212px] min-w-fit mobile:min-w-[358px] mobile:flex-grow lg:p-6 lg:min-w-[412px] lg:min-h-[256px]", card.classNames?.card].join(" ")}>
            <div className={["flex items-center justify-start gap-6 lg:flex-col lg:items-start lg:justify-between lg:h-full", card.classNames?.cardInner].join(" ")}>
              <Icon key={card.icon.iconName}
                    className={["flex-shrink-0 lg:w-20 lg:h-20", card.classNames?.icon].join(" ")}
                    spriteHref={card.icon.spriteHref}
                    iconName={card.icon.iconName}
                    width={card.icon.iconWidth}
                    height={card.icon.iconHeight}/>
              <p className={["text-2xl text-bl2 w-fit leading-7 lg:text-[32px]", card.classNames?.title].join(" ")}>
                {card.title}
              </p>
            </div>
            <p className={["text-sm text-bl2 leading-5 lg:hidden", card.classNames?.description].join(" ")}
               dangerouslySetInnerHTML={{__html: card.description}}></p>
          </div>
        );
      })}
    </div>
  );
};

export default CardList;