"use client";

import React, {
  ComponentPropsWithoutRef,
  JSX,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {useAnimate} from "framer-motion";
import {TSequentialTaskQueue, SequentialTaskQueue} from "@/utils/SequentialTaskQueue";

type TBulletsProps = ComponentPropsWithoutRef<"div"> & {
  amount?: number,
  startBulletIndex?: number,
  onChangeBullet?: (number: number) => void,
}

type TCurrentTarget = { offsetLeft: number, clientWidth: number }

const Bullets = memo(function Bullets ({
                   amount = 1,
                   startBulletIndex = 0,
                   className,
                   onChangeBullet,
                   ...props
                 }: TBulletsProps): JSX.Element {
  if (amount <= 0) throw new Error('amount must be a positive number');
  if (startBulletIndex < 0) throw new Error('currentBulletIndex must be greater than or equal to zero');
  if (startBulletIndex > amount - 1) throw new Error('currentBulletIndex must be in the range');

  const backgroundDotRef = useRef<HTMLDivElement>(null)
  const currentDotRef = useRef<HTMLDivElement>(null)
  const queueAnimations = useRef<TSequentialTaskQueue>(new SequentialTaskQueue())
  const [scope, animate] = useAnimate<HTMLDivElement>()

  const [currentBulletIndex, setCurrentBulletIndex] = useState<number>(0)

  const widthBlock = 8
  const gap = 8

  async function handleClickDot(e: MouseEvent<HTMLDivElement>): Promise<void> {
    const bulletIndex = Number(e.currentTarget.attributes["0"].value)

    if (currentBulletIndex === bulletIndex) return;
    if (onChangeBullet) onChangeBullet(bulletIndex)

    setCurrentBulletIndex(bulletIndex)
    addAnimationQueue(e.currentTarget)
  }

  const addAnimationQueue = useCallback(function addAnimationQueue(target: TCurrentTarget): void {
    if (backgroundDotRef.current === null || currentDotRef.current === null) return;

    const {offsetLeft: offsetLeftTarget, clientWidth: clientWidthTarget} = target

    const countAnimations = queueAnimations.current.getLength()
    const duration = countAnimations > 2 ? 0.5 : 1
    const ease = "linear"

    // backward
    if (((currentBulletIndex + 1) * widthBlock + gap * currentBulletIndex) >= offsetLeftTarget) {
      queueAnimations.current.add(async () => {
        if (backgroundDotRef.current === null || currentDotRef.current === null) return;

        await animate([
          [backgroundDotRef.current, {
            width: backgroundDotRef.current.offsetLeft - offsetLeftTarget + clientWidthTarget,
            left: offsetLeftTarget,
          }],
          [currentDotRef.current, {
            left: offsetLeftTarget
          }],
          [backgroundDotRef.current, {
            width: clientWidthTarget,
          }],
        ], {duration, ease})
      })
    } else { //forward
      queueAnimations.current.add(async () => {
        if (backgroundDotRef.current === null || currentDotRef.current === null) return;

        await animate([
          [backgroundDotRef.current, {
            width: offsetLeftTarget - backgroundDotRef.current.offsetLeft + clientWidthTarget,
          }],
          [currentDotRef.current, {
            left: offsetLeftTarget
          }],
          [backgroundDotRef.current, {
            width: clientWidthTarget,
            left: offsetLeftTarget,
          }],
        ], {duration, ease})
      })
    }
  }, [currentBulletIndex, animate, widthBlock, gap])

  const dots = (): JSX.Element[] => {
    const dotsArray: JSX.Element[] = [];

    for (let i = 0; i < amount; i++) {
      dotsArray.push(<div onClick={handleClickDot} data-dot-num={i} key={i} className="min-w-2 min-h-2  w-2 h-2 rounded-[100%] bg-darkest-gray"></div>);
    }

    return dotsArray;
  }

  useEffect(() => {
    const startOffset = widthBlock * startBulletIndex + gap * startBulletIndex;

    addAnimationQueue({offsetLeft: startOffset, clientWidth: 8})

    if (currentBulletIndex !== startBulletIndex) {
      setCurrentBulletIndex(startBulletIndex)
    }

  }, [startBulletIndex, addAnimationQueue, currentBulletIndex])

  return (
    <div ref={scope} className={["flex flex-row gap-x-2 overflow-x-hidden relative", className].join(" ")}  {...props}>
      <div ref={backgroundDotRef}
           className="left-0 w-2 h-2 rounded-[10px] bg-darkest-gray absolute pointer-events-none"></div>
      <div ref={currentDotRef}
           className="left-0 min-w-2 min-h-2 w-2 h-2 rounded-[100%] bg-dark-gray absolute pointer-events-none"></div>
      {dots()}
    </div>
  );
});

export default Bullets;