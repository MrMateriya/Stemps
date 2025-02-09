import React, {ComponentPropsWithRef, JSX} from 'react';
import {IconParams} from "@/UI/types";

type TIconProps = ComponentPropsWithRef<"svg"> & IconParams

function Icon({
                iconName,
                spriteHref,
                height,
                width,
                ...props
              }: TIconProps): JSX.Element {
  return (
    <svg width={width} height={height} {...props}>
      <use href={`${spriteHref}#${iconName}`}/>
    </svg>
  );
}

export default Icon;