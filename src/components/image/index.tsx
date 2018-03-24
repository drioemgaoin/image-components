import * as React from 'react';

export interface ImageProps {
    src: string;
    alt?: string;
}

export const Image: React.SFC<ImageProps> = props => {
    return <img src={props.src} alt={props.alt} />;
};
