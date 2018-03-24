import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';

import { Image } from './index';

describe('Button', () => {
    it('should set the src attribute', () => {
        const wrapper = mount(<Image src="mysource" />);

        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('img').prop('src')).toBe('mysource');
    });

    it('should set the alt attribute if exist', () => {
        const wrapper = mount(<Image src="mysource" alt="myalt" />);

        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('img').prop('alt')).toBe('myalt');
    });
});
