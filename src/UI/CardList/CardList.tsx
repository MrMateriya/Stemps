"use client";

import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {Card} from "@/UI/types";
import {animate} from "framer-motion";
import {Icon} from "@/UI";
import {useWindowSize} from "@/hooks/useWindowSize";

interface CardListProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: Card[],
  currentCardIndex: number,
  onChangeCard: (index: number) => void,
}

const CardList = ({
                    cards, currentCardIndex = 0, className, onChangeCard,
                    ...props
                  }: CardListProps): React.JSX.Element => {
  const isBrowser = typeof window !== 'undefined';
  const list = useRef<HTMLDivElement>(null)
  let isPlayingAnimation = useRef<boolean>(false)

  let gap = 16;
  let widthCard: number = 358;
  if (isBrowser && window.innerWidth >= Number(process.env.NEXT_PUBLIC_SCREEN_LG)) widthCard = 412;
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
        onChangeCard(0)
        return;
      }
      onChangeCard(cards.length - 1);
      return;
    }

    for (let i = 0; i < cards.length; i++) {
      if (i === cards.length - 1 || i === 0) {
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
        onChangeCard(i);
      } else if (e.currentTarget.scrollLeft > cardsOffsetLeft[i] && i === cardsOffsetLeft.length) {
        onChangeCard(i);
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

  useEffect(() => {
    const controls = Animating(currentCardIndex)
    return () => controls?.stop()
  }, [currentCardIndex]);

  console.log(widthCard)
  function Animating(index: number) {
    if (!list.current || isPlayingAnimation.current) return;
    isPlayingAnimation.current = true

    const toScrollLeft = calculateScrollLeft(index)

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
               className={["relative flex flex-col justify-between p-4 bg-light-gray rounded-lg min-h-[212px] min-w-fit mobile:min-w-[358px] mobile:flex-grow lg:p-6 lg:min-w-[412px] lg:min-h-[256px]", card.classNames?.card].join(" ")}
               style={{width: widthCard}}>
            <div className={["flex items-center justify-start gap-6 lg:flex-col lg:items-start lg:justify-between lg:h-full", card.classNames?.cardInner].join(" ")}>
              <Icon key={card.icon.iconName}
                    className={["flex-shrink-0 lg:w-20 lg:h-20", card.classNames?.icon].join(" ")}
                    spriteHref={card.icon.spriteHref}
                    iconName={card.icon.iconName}
                    width={card.icon.iconWidth}
                    height={card.icon.iconHeight}/>
              <p className={["text-2xl text-bl2 w-fit leading-7", card.classNames?.title].join(" ")}>
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