import * as React from 'react';
import { times } from 'lodash';
import { Image } from '../../../src/components';

export class ImagePage extends React.PureComponent {
    public renderImage(index: number) {
        return (
            <Image
                key={index}
                src={`https://res.cloudinary.com/dta1uktko/image/upload/w_${this.getRandom(
                    50,
                    350
                )},h_130,c_fit/vhez4aa800fhgjnitnxk`}
                alt="cut-1"
            />
        );
    }

    public render() {
        return times(10000, index => this.renderImage(index));
    }

    private getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (1 + max - min)) + min;
    }
}
