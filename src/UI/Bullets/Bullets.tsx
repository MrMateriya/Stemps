"use client";
import React, {MouseEvent, useEffect, useMemo, useRef} from 'react';
import {useAnimate} from "framer-motion";

interface BulletsProps extends React.HTMLAttributes<HTMLDivElement> {
  amount?: number,
  currentBulletIndex?: number,
  onClickBullet?: (number: number) => void,
}
interface HTMLDivElementWithOffsetState extends HTMLDivElement {
  offsetLeftTemp: number,
}

const Bullets = ({
                   amount = 0,
                   currentBulletIndex = 0,
                   className,
                   onClickBullet,
                   ...props
                 }: BulletsProps
): React.JSX.Element => {
  if (amount <= 0) throw new Error('amount must be a positive number');
  if (currentBulletIndex < 0) throw new Error('currentBulletIndex must be greater than or equal to zero');
  if (currentBulletIndex > amount - 1) throw new Error('currentBulletIndex must be in the range');

  const [scope, animate] = useAnimate()
  let isPlayingAnimation = useRef<boolean>(false)

  const backgroundDotRef = useRef<HTMLDivElementWithOffsetState>(null)
  const currentDotRef = useRef<HTMLDivElement>(null)

  const widthBlock = 8
  const gap = 8

  useEffect(() => {
    const startAnimation = async () => {
      if (isPlayingAnimation.current) return;
      const startOffset = widthBlock * currentBulletIndex + gap * currentBulletIndex;
      await Animating({offsetLeft: startOffset, clientWidth: 8})
    }
    startAnimation()
  }, [currentBulletIndex])

  async function handleClickDot(e: MouseEvent<HTMLDivElement>) {
    const bulletIndex = Number(e.currentTarget.attributes["0"].value)

    if (isPlayingAnimation.current) return;
    if (onClickBullet) {
      onClickBullet(bulletIndex)
    }

    await Animating(e.currentTarget)
  }

  async function Animating(target: {offsetLeft: number, clientWidth: number}) {
    isPlayingAnimation.current = true;
    
    const speedAnimation = 0.5
    const speedEase = "easeInOut"

    const {offsetLeft: offsetLeftTarget, clientWidth: clientWidthTarget} = target
    if (backgroundDotRef.current === null || currentDotRef.current === null) return

    if (backgroundDotRef.current.offsetLeftTemp === undefined) backgroundDotRef.current.offsetLeftTemp = 0;
    if (backgroundDotRef.current.offsetLeftTemp === offsetLeftTarget) return;

    //animation logic
    if (offsetLeftTarget > backgroundDotRef.current.offsetLeftTemp) {
      await animate(backgroundDotRef.current, {
        width: offsetLeftTarget - backgroundDotRef.current.offsetLeftTemp + clientWidthTarget,
      }, {duration: speedAnimation, ease: speedEase})
      await animate(currentDotRef.current, {
        x: offsetLeftTarget
      }, {duration: speedAnimation, ease: speedEase})
      await animate(backgroundDotRef.current, {
        width: clientWidthTarget,
        x: offsetLeftTarget,
      }, {duration: speedAnimation, ease: speedEase})
    } else {
      await animate(backgroundDotRef.current, {
        width: backgroundDotRef.current.offsetLeftTemp + clientWidthTarget - offsetLeftTarget,
        x: offsetLeftTarget,
      }, {duration: speedAnimation, ease: speedEase})
      await animate(currentDotRef.current, {
        x: offsetLeftTarget
      }, {duration: speedAnimation, ease: speedEase})
      await animate(backgroundDotRef.current, {
        width: clientWidthTarget,
      }, {duration: speedAnimation, ease: speedEase})
    }

    backgroundDotRef.current.offsetLeftTemp = offsetLeftTarget
    isPlayingAnimation.current = false;
  }

  const dots = useMemo(() => {
    const dotsArray = [];

    for (let i = 0; i < amount; i++) {
      dotsArray.push(<div onClick={handleClickDot} data-dot-num={i} key={i} className="min-w-2 min-h-2  w-2 h-2 rounded-[100%] bg-darkest-gray"></div>);
    }

    return dotsArray;
  }, [amount])

  return (
    <div ref={scope} className={["flex flex-row gap-x-2 overflow-x-hidden relative", className].join(" ")}  {...props}>
      <div ref={backgroundDotRef} className="h2 h-2 rounded-[10px] bg-darkest-gray absolute pointer-events-none"></div>
      <div ref={currentDotRef} className="min-w-2 min-h-2  w-2 h-2 rounded-[100%] bg-dark-gray absolute pointer-events-none"></div>
      {dots}
    </div>
  );
};

export default Bullets;