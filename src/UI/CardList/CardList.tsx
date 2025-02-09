"use client";

import React, {
  JSX,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  TouchEvent,
  MouseEvent,
  ComponentPropsWithoutRef,
} from 'react';
import {Card} from "@/UI/types";
import {animate, AnimationPlaybackControls} from "framer-motion";
import {Icon} from "@/UI";
import {useWindowSize} from "@/hooks/useWindowSize";

type TCardListProps = ComponentPropsWithoutRef<"div"> & {
  cards: Card[],
  startCardIndex?: number,
  onChangeCard?: (index: number) => void,
}

const CardList = memo(function CardList({
                    cards,
                    startCardIndex = 0,
                    className,
                    onChangeCard,
                    ...props
                  }: TCardListProps): JSX.Element {
  const list = useRef<HTMLDivElement>(null)
  const isPlayingAnimation = useRef<boolean>(false)
  const { width: windowWidth } = useWindowSize()

  const gap = 16;
  const [widthCard, setWidthCard] = useState<number>(358)
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

  const alignmentCardThreshold = widthCard / 2;

  let startScrollLeft = 0;
  let startX: number;
  let difference = 0;
  const scrollSpeed = 0.5;
  let isScrolling = false;

  function handleScrolling(e: TouchEvent | MouseEvent): void {
    if (!list.current || !isScrolling || isPlayingAnimation.current) return;

    if (e.type === 'touchmove') {
      difference = (e as TouchEvent).changedTouches[0].clientX - startX;
    } else if (e.type === 'mousemove') {
      e.preventDefault()
      difference = (e as MouseEvent).clientX - startX;
    }
    list.current.scrollLeft = startScrollLeft - (difference * scrollSpeed);
  }

  function handleScrollingStart(e: TouchEvent | MouseEvent): void {
    if (!list.current || isPlayingAnimation.current) return;

    isScrolling = true;
    if (e.type === 'touchstart') {
      startX = (e as TouchEvent).changedTouches[0].clientX;
    } else if (e.type === 'mousedown') {
      e.preventDefault()
      startX = (e as MouseEvent).clientX;
    }
    startScrollLeft = list.current.scrollLeft;
  }

  function handleScrollingEnd(e: MouseEvent | TouchEvent): void {
    if (!list.current || !isScrolling || isPlayingAnimation.current) return;
    isScrolling = false;

    const fullScrollLeft = list.current.scrollWidth - list.current.clientWidth
    const cardsOffsetLeft: number[] = []

    if (e.currentTarget.scrollLeft === fullScrollLeft) {
      if (cards.length === 0) {
        if (onChangeCard) onChangeCard(0)
        animating(0)
        setCurrentCardIndex(0)
        return;
      }
      if (currentCardIndex === cards.length - 1) {
        animating(cards.length - 1)
        return;
      }
      if (onChangeCard) onChangeCard(cards.length - 1);
      animating(cards.length - 1)
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
          animating(i)
          return;
        }
        if (onChangeCard) onChangeCard(i);
        animating(i)
        setCurrentCardIndex(i)
      } else if (e.currentTarget.scrollLeft > cardsOffsetLeft[i] && i === cardsOffsetLeft.length - 1) {
        if (currentCardIndex === i) {
          animating(i)
          return;
        }
        if (onChangeCard) onChangeCard(i);
        animating(i)
        setCurrentCardIndex(i)
      }
    }
  }

  const calculateScrollLeft = useCallback(function calculateScrollLeft(slideIndex: number): number {
    if (!list.current) return 0;
    if (!cards[slideIndex]) {
     throw new Error(`currentSlideIndex must be in the range, i: ${slideIndex}`);
    }

    return (widthCard * slideIndex + gap * slideIndex);
  }, [cards, widthCard, gap])

  const animating = useCallback(function Animating(index: number): AnimationPlaybackControls | undefined {
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
      onUpdate: (latest): void => {
        if (!list.current) return;
        list.current.scrollLeft = latest;
      },
      onComplete: () => {
        isPlayingAnimation.current = false
      },
    })
  }, [calculateScrollLeft])

  useEffect(() => {
    const controls = animating(startCardIndex)
    if (currentCardIndex !== startCardIndex) {
      setCurrentCardIndex(startCardIndex)
    }

    return () => controls?.stop()
  }, [animating, startCardIndex, currentCardIndex]);

  useLayoutEffect(() => {
    if (!windowWidth) return;
    if (!list.current) return;
    if (windowWidth >= Number(process.env.NEXT_PUBLIC_SCREEN_LG)) {
      setWidthCard(412)
    } else if (windowWidth >= 410) {
      setWidthCard(358)
    } else {
      setWidthCard(list.current.clientWidth)
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
      {cards.map((card: Card): JSX.Element => {
        return (
          <div key={card.id}
               className={[`overflow-hidden relative flex flex-grow flex-col justify-between p-4 bg-light-gray rounded-lg min-h-[212px] mobile:min-w-[358px] lg:p-6 lg:min-w-[412px] lg:min-h-[256px]`, card.classNames?.card].join(" ")}
               style={{
                 minWidth: widthCard,
               }}>
            <div className={["flex items-center justify-start gap-6 lg:flex-col lg:items-start lg:justify-between lg:h-full", card.classNames?.cardInner].join(" ")}>
              <Icon key={card.icon.iconName}
                    className={["flex-shrink-0 lg:w-20 lg:h-20", card.classNames?.icon].join(" ")}
                    spriteHref={card.icon.spriteHref}
                    iconName={card.icon.iconName}
                    width={card.icon.iconWidth}
                    height={card.icon.iconHeight}/>
              <p className={["text-xl mobile:text-2xl text-bl2 w-fit leading-7 lg:text-[32px]", card.classNames?.title].join(" ")}>
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
});

export default CardList;