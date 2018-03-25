import * as React from 'react';
import * as bem from 'bem-classname';
import { FaClose } from 'react-icons/lib/fa';

import { getDataTransferItems, fileAccepted, fileMatchSize } from './util';

export interface UploadProps {
    disabled?: boolean;
    accept?: string;
    minSize?: number;
    maxSize?: number;
    multiple?: boolean;
}

export interface UploadState {
    processing: boolean;
    isDragActive: boolean;
    files?: File[];
    acceptedfiles?: FileList;
    rejectedfiles?: FileList;
}

export class Upload extends React.Component<UploadProps, UploadState> {
    private onComposeHandlers = this.composeHandlers.bind(this);
    private onDragEnter = this.dragEnter.bind(this);
    private onDragOver = this.dragOver.bind(this);
    private onDragLeave = this.dragLeave.bind(this);
    private onDrop = this.drop.bind(this);
    private onDeleteFile = (index: number) => this.deleteFile.bind(this, index);
    private onOpenFileExplorer = this.openFileExplorer.bind(this);
    private onSelectFile = this.selectFile.bind(this);

    private inputElement: HTMLInputElement;
    private divElement: HTMLDivElement;
    private dragTargets: any[];

    constructor(props: UploadProps) {
        super(props);

        this.dragTargets = [];

        this.state = {
            processing: false,
            isDragActive: false
        };
    }

    render() {
        const rootClassName = bem('Upload', { isDragActive: this.state.isDragActive });
        const inputAttributes: any = {
            multiple: this.props.multiple
        };
        return (
            <div
                className={rootClassName}
                onDragEnter={this.onComposeHandlers(this.onDragEnter)}
                onDragOver={this.composeHandlers(this.onDragOver)}
                onDragLeave={this.composeHandlers(this.onDragLeave)}
                onDrop={this.composeHandlers(this.onDrop)}
                ref={element => (this.divElement = element)}
            >
                <div>
                    <input
                        ref={element => (this.inputElement = element)}
                        type="file"
                        onChange={this.onSelectFile}
                        style={{ display: 'none' }}
                        {...inputAttributes}
                    />

                    <label className="Upload__drop">Drop files here</label>

                    <label className="Upload__separator">or if you prefer...</label>

                    <button className="Upload__select" type="submit" onClick={this.onOpenFileExplorer}>
                        Select a file from your computer
                    </button>

                    {this.state.files && this.renderSelectedFile()}
                </div>
            </div>
        );
    }

    private composeHandlers(handler: any) {
        if (this.props.disabled) {
            return null;
        }

        return handler;
    }

    private dragEnter(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        if (this.dragTargets.indexOf(e.target) === -1) {
            this.dragTargets.push(e.target);
        }

        this.setState({
            isDragActive: true
        });
    }

    private dragOver(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
    }

    private dragLeave(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        this.dragTargets = this.dragTargets.filter(el => el !== e.target && this.divElement.contains(el));
        if (this.dragTargets.length > 0) {
            return;
        }

        this.setState({
            isDragActive: false
        });
    }

    private drop(e: React.SyntheticEvent<HTMLDivElement>) {
        e.preventDefault();

        const fileList = getDataTransferItems(e);
        const acceptedFiles: any = [];
        const rejectedFiles: any = [];

        fileList.forEach((file: any) => {
            if (fileAccepted(file, this.props.accept) && fileMatchSize(file, this.props.maxSize, this.props.minSize)) {
                acceptedFiles.push(file);
            } else {
                rejectedFiles.push(file);
            }
        });

        this.setState({
            isDragActive: false,
            files: fileList
        });
    }

    private openFileExplorer(e: HTMLButtonElement) {
        this.inputElement.click();
    }

    private selectFile(e: HTMLInputElement) {
        this.setState({ files: e.target.files });
    }

    private deleteFile(index: number, e: React.SyntheticEvent<FaClose>) {
        e.preventDefault();

        this.setState((state, props) => {
            const files = Array.from(this.state.files);
            files.splice(index, 1);
            return { files };
        });
    }

    private renderSelectedFile() {
        return (
            <div className="Upload__result">
                {Array.from(this.state.files).map((file: File, index: number) => {
                    return (
                        <div key={index} className="Upload__result__item">
                            <FaClose onClick={this.onDeleteFile(index)} />
                            <p>{file.name}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}
