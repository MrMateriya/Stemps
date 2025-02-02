import React from 'react';
import {IconParams} from "@/UI/types";

interface IconProps extends IconParams, React.SVGProps<SVGSVGElement> {

}

function Icon({
                iconName,
                spriteHref,
                height,
                width,
                ...props
              }: IconProps): React.JSX.Element {
  return (
    <svg width={width} height={height} {...props}>
      <use href={`${spriteHref}#${iconName}`}/>
    </svg>
  );
}

export default Icon;