import * as React from 'react';
import { mount } from 'enzyme';
import * as sinon from 'sinon';

import { Upload } from './index';

describe('Upload', () => {
    describe('via open file explorer', function() {
        it('should not be able to open file explorer if component is disabled', () => {
            const wrapper = mount(<Upload disabled={true} />);

            const button = wrapper
                .find('[className="Upload__select"]')
                .first()
                .getDOMNode() as HTMLButtonElement;
            expect(button.onclick).toBeNull;
        });

        it('should set multiple to false by default', () => {
            const wrapper = mount(<Upload />);

            expect(wrapper.find('input').prop('multiple')).toBe(false);
        });

        it('should set multiple to true if multiple property is set to true', () => {
            const wrapper = mount(<Upload multiple={true} />);

            expect(wrapper.find('input').prop('multiple')).toBe(true);
        });

        it('should not set accept by default', () => {
            const wrapper = mount(<Upload />);

            expect(wrapper.find('input').prop('accept')).toBeNull;
        });

        it('should set accept if accept property if setted', () => {
            const wrapper = mount(<Upload accept="my acceptance" />);

            expect(wrapper.find('input').prop('accept')).toBe('my acceptance');
        });

        it('should not be able to select a file smaller than the minimum size required', () => {
            const file = new File([new Blob(['file contents'], { type: 'text/plain' })], 'file.txt');

            const wrapper = mount(<Upload minSize={123564} />);

            wrapper.find('input').simulate('change', { target: { files: [file] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(0);
        });

        it('should not be able to select a file greater than the maximum size required', () => {
            const file = new File([new Blob(['file contents'], { type: 'text/plain' })], 'file.txt');

            const wrapper = mount(<Upload maxSize={1} />);

            wrapper.find('input').simulate('change', { target: { files: [file] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(0);
        });
    });

    describe('via drag and drop', function() {
        it('should not be able to drop any file if component is disabled', () => {
            const wrapper = mount(<Upload disabled={true} />);

            const button = wrapper
                .find('[className="Upload"]')
                .first()
                .getDOMNode() as HTMLDivElement;
            expect(button.ondragenter).toBeNull;
            expect(button.ondragover).toBeNull;
            expect(button.ondrop).toBeNull;
        });

        it('should not be able to drop multiple files by default', () => {
            const file1 = new Blob(['file1 contents'], { type: 'text/plain' });
            const file2 = new Blob(['file2 contents'], { type: 'text/plain' });

            const wrapper = mount(<Upload />);

            wrapper.find('[className="Upload"]').simulate('drop', { target: { files: [file1, file2] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(1);
            expect(component.state.files[0]).toEqual(file1);
        });

        it('should be able to drop multiple files if component does allow multiple files', () => {
            const file1 = new Blob(['file1 contents'], { type: 'text/plain' });
            const file2 = new Blob(['file2 contents'], { type: 'text/plain' });

            const wrapper = mount(<Upload multiple={true} />);

            wrapper.find('[className="Upload"]').simulate('drop', { target: { files: [file1, file2] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(2);
            expect(component.state.files[0]).toEqual(file1);
            expect(component.state.files[1]).toEqual(file2);
        });

        it('should not be able to drop a file that does not match acceptance criteria', () => {
            const file = new File([new Blob(['file contents'], { type: 'text/plain' })], 'file.txt');

            const wrapper = mount(<Upload accept=".jpeg" />);

            wrapper.find('[className="Upload"]').simulate('drop', { target: { files: [file] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(0);
        });

        it('should not be able to drop a file smaller than the minimum size required', () => {
            const file = new File([new Blob(['file contents'], { type: 'text/plain' })], 'file.txt');

            const wrapper = mount(<Upload minSize={123564} />);

            wrapper.find('[className="Upload"]').simulate('drop', { target: { files: [file] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(0);
        });

        it('should not be able to drop a file greater than the maximum size required', () => {
            const file = new File([new Blob(['file contents'], { type: 'text/plain' })], 'file.txt');

            const wrapper = mount(<Upload maxSize={1} />);

            wrapper.find('[className="Upload"]').simulate('drop', { target: { files: [file] } });

            const component = wrapper.instance();
            expect(component.state.files).toHaveLength(0);
        });
    });
});
