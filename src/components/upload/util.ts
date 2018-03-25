import accepts from 'attr-accept';

export function getDataTransferItems(event: any) {
    let dataTransferItemsList = [];
    if (event.dataTransfer) {
        const dt = event.dataTransfer;
        if (dt.files && dt.files.length) {
            dataTransferItemsList = dt.files;
        } else if (dt.items && dt.items.length) {
            // During the drag even the dataTransfer.files is null
            // but Chrome implements some drag store, which is accesible via dataTransfer.items
            dataTransferItemsList = dt.items;
        }
    } else if (event.target && event.target.files) {
        dataTransferItemsList = event.target.files;
    }
    // Convert from DataTransferItemsList to the native Array
    return Array.prototype.slice.call(dataTransferItemsList);
}

export function fileAccepted(file: any, accept: string) {
    return file.type === 'application/x-moz-file' || accepts(file, accept);
}

export function fileMatchSize(file: any, maxSize: number, minSize: number) {
    return file.size <= maxSize && file.size >= minSize;
}
