import * as React from 'react';

export interface UploadProps {}

export class Upload extends React.Component<UploadProps, undefined> {
    private onClickBound = this.onClick.bind(this);

    render() {
        return (
            <div className="Upload">
                <label className="Upload__drag">Drag a file here</label>
                <label className="Upload__or">or if you prefer...</label>
                <button className="Upload__button" onClick={this.onClickBound}>
                    Select a file from your computer
                </button>
            </div>
        );
    }

    private onClick() {}
}
