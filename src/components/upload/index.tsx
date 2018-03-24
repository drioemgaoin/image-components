import * as React from 'react';

export interface UploadProps {}

export interface UploadState {
    processing: boolean;
    files?: FileList;
}

export class Upload extends React.Component<UploadProps, UploadState> {
    private submitBound = this.submit.bind(this);
    private openFileExplorerBound = this.openFileExplorer.bind(this);
    private selectFileBound = this.selectFile.bind(this);
    private inputElement: HTMLInputElement;

    constructor(props: UploadProps) {
        super(props);

        this.state = {
            processing: false
        };
    }

    render() {
        return (
            <div className="Upload">
                <form className="Upload__form" onSubmit={this.submitBound} encType="multipart/form-data">
                    <input
                        ref={input => (this.inputElement = input)}
                        type="file"
                        onChange={this.selectFileBound}
                        style={{ display: 'none' }}
                    />

                    <label className="Upload__form__drag">Drag a file here</label>

                    <label className="Upload__form__separator">or if you prefer...</label>

                    <button className="Upload__form__select" type="submit" onClick={this.openFileExplorerBound}>
                        Select a file from your computer
                    </button>

                    {this.state.files && this.renderFileSelected()}
                </form>
            </div>
        );
    }

    private submit(e: HTMLFormElement) {
        e.preventDefault();

        this.setState({ processing: true, files: null });
    }

    private openFileExplorer(e: HTMLButtonElement) {
        this.inputElement.click();
    }

    private selectFile(e: HTMLInputElement) {
        this.setState({ files: e.target.files });
    }

    private renderFileSelected() {
        return (
            <div className="Upload__form__result">
                {Array.from(this.state.files).map((file: File, index: number) => (
                    <label key={index}>{file.name}</label>
                ))}
            </div>
        );
    }
}
