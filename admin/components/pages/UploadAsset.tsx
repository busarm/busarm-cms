import React, { useState, useEffect } from 'react';
import { ActionProps, ActionResponse, ApiClient, useNotice } from 'adminjs';
import { Box, DropZone, Button, Label, Input, FormGroup, Table, TableHead, TableBody, TableCell, TableRow } from '@adminjs/design-system';
import ProgressBar from '../utils/ProgressBar';
import { AxiosResponse } from 'axios';
import Flat from 'flat';

const api = new ApiClient();

// Define Upload Type model
interface UploadType {
    id: string;
    name: string;
    isFileType: boolean;
    mimeTypes: string[];
    maxSizeBytes: number;
}

// Define Uploads model
class Upload {
    public done?: Boolean = false;
    public failed?: Boolean = false;
    public success?: Boolean = false;
    public progress?: Number = null;
    public keywords?: String = null;

    constructor(public id: Number, public file: File, public thumbnail?: File, public preview?: File) { }
}

// Define types of supported upload resources.
enum UploadResources {
    Asset = 'Asset',
    Curated = 'Curated',
}

/**
 * @param {ActionProps} props
 * @returns {JSX.Element}
 */
const UploadAsset: React.FC<ActionProps> = (props: ActionProps): JSX.Element => {
    const { action, resource, record } = props;
    const [type, setType]: [UploadType, Function] = useState(null);
    const [types, setTypes]: [UploadType[], Function] = useState([]);
    const [keywords, setKeywords]: [String, Function] = useState(null);
    const [uploads, setUploads]: [Upload[], Function] = useState([]);
    const [completed, setCompleted]: [Boolean, Function] = useState(false);
    const sendNotice = useNotice();

    const thumbnailMaxSize = action.custom.thumbnail.maxSizeBytes;
    const thumbnailMimeTypes = action.custom.thumbnail.mimeTypes;
    const previewMaxSize = action.custom.preview.maxSizeBytes;
    const previewlMimeTypes = action.custom.preview.mimeTypes;


    /**
     * Type changed Event
     * @param {React.SyntheticEvent<HTMLInputElement>} event
     */
    const onTypeChanged = (event: React.SyntheticEvent<HTMLInputElement>) => {
        if (event.currentTarget) {
            const value = event.currentTarget.value;
            if(type && value !== type.id) {
                setUploads([]);
            }
            setType(types.find((type) => type.id === value));
        }
    };

    /**
     * Keywords changed Event
     * @param {React.SyntheticEvent<HTMLInputElement>} event
     */
    const onKeywordsChanged = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const value = event.currentTarget?.value;
        const data = uploads.map((upload) => {
            // If upload keywords is empty or still same as global keywords
            if((!upload.keywords || upload.keywords.length < 1) || upload.keywords === keywords){
                upload.keywords = value;
            }
            return upload;
        });
        setUploads(data);
        setKeywords(value);
    };

    /**
     * Files uploaded event
     * @param {Files[]} files
     */
    const onUpload = (files: File[]) => {
        const data: Upload[] = [];
        files.forEach((file, index) => {
            const upload = new Upload(index + 1, file)
            upload.keywords = keywords;
            data.push(upload);
        });
        setUploads(data);
    };

    /**
     * File thumbnail uploaded event
     * @param {Files[]} files
     * @param {Number} index
     */
    const onUploadThumbnail = (files: File[], index: Number) => {
        const data: Upload[] = [...uploads];
        data[+index].thumbnail = files.length && files[0];
        setUploads(data);
    };

    /**
     * File Preview uploaded event
     * @param {Files[]} files
     * @param {Number} index
     */
    const onUploadPreview = (files: File[], index: Number) => {
        const data: Upload[] = [...uploads];
        data[+index].preview = files.length && files[0];
        setUploads(data);
    };

    /**
     * Upload Keywords changed Event
     * @param {React.SyntheticEvent<HTMLInputElement>} event
     * @param {Number} index
     */
     const onUploadKeywordsChanged = (event: React.SyntheticEvent<HTMLInputElement>, index: Number) => {
        const data: Upload[] = [...uploads];
        data[+index].keywords = event.currentTarget?.value;
        setUploads(data);
    };

    /**
     * Submit button click event
     */
    const onClick = async () => {
        if (types && types.length > 0 && (!type || !types.find((t) => t.id === type.id))) {
            return sendNotice({ message: 'Please select a type', type: 'error' });
        }

        if (!uploads || uploads.length < 1) {
            return sendNotice({ message: 'Please upload file(s)', type: 'error' });
        }

        // Submit uploads
        submitMultiple(type, uploads);
    };

    /**
     * Replace upload object with new one
     *
     * @param {Number} index
     * @param {Upload} upload
     */
    const replaceUpload = async (index: Number, upload: Upload) => {
        const tempList = [...uploads];
        tempList[+index] = { ...upload };
        setUploads(tempList);
    };

    /**
     * Submit items to API
     * @param {UploadType} type
     * @param {Upload[]} uploads
     */
    const submitMultiple = async (type: UploadType, uploads: Upload[]) => {
        if (!completed || confirm('Are you sure you want to continue? The upload will be repeated which may lead to duplicates.')) {
            
            // Refresh status
            if(completed) {
                setUploads(uploads.map(upload => {
                    upload.failed = false;
                    upload.success = false;
                    upload.done = false;
                    return upload;
                }));
            }

            const updatedUploads = await Promise.all(
                uploads.map(async (upload, index) => {
                    const result = await doUpload(type, upload, index);
                    if (result.status === 200 && result.data.notice) {
                        if (result.data.notice.type === 'success') {
                            sendNotice(result.data.notice);
                            upload.failed = false;
                            upload.success = true;
                            upload.done = true;
                            return upload;
                        } else {
                            sendNotice(result.data.notice);
                            upload.failed = true;
                            upload.success = false;
                            upload.done = true;
                            return upload;
                        }
                    } else {
                        sendNotice({ message: 'Failed to upload', type: 'error' });
                        upload.failed = true;
                        upload.success = false;
                        upload.done = true;
                        return upload;
                    }
                })
            );
            setUploads(updatedUploads);
            setCompleted(true);
        }
    };

    /**
     * Submit single item to API
     * @param {UploadType} type
     * @param {Upload} upload
     * @param {Number} index
     */
    const submitSingle = async (type: UploadType, upload: Upload, index: Number) => {

        // Refresh status
        if(completed && upload) {
            replaceUpload(index, { ...upload, done: false, success: false, failed: false });
        }

        const result = await doUpload(type, upload, index);
        // Show notice and update upload status
        if (result.status === 200 && result.data.notice) {
            if (result.data.notice.type === 'success') {
                sendNotice(result.data.notice);
                replaceUpload(index, { ...upload, done: true, success: true, failed: false });
            } else {
                sendNotice(result.data.notice);
                replaceUpload(index, { ...upload, done: true, success: false, failed: true });
            }
        } else {
            sendNotice({ message: 'Failed to upload', type: 'error' });
            replaceUpload(index, { ...upload, done: true, success: false, failed: true });
        }
    };

    /**
     * Perform upload
     * @param {UploadType} type
     * @param {Upload} upload
     * @param {Number} index
     * @returns {Promise<AxiosResponse<ActionResponse>>}
     */
    const doUpload = async (type: UploadType, upload: Upload, index: Number = 0): Promise<AxiosResponse<ActionResponse>> => {
        const form = new FormData();
        form.append('file', upload.file);
        if (type) form.append('type', type?.id);
        if (upload.keywords) form.append('keywords', upload.keywords && upload.keywords.trim());
        if (upload.thumbnail) form.append('thumbnail', upload.thumbnail);
        if (upload.preview) form.append('preview', upload.preview);

        /**
         * Handle On Upload Progress Event
         * @param {ProgressEvent} event
         */
        const onUploadProgress = (event: ProgressEvent) => {
            // Show Progress
            upload.progress = Math.round((event.loaded / event.total) * 100);
            replaceUpload(index, upload);
        };

        // Process as a recored action if record id available
        if (record?.id) {
            return api.recordAction({
                recordId: record?.id,
                resourceId: resource.id,
                actionName: action.name,
                data: form,
                onUploadProgress,
            });
        }
        // Process as a resource action
        else {
            return api.resourceAction({
                resourceId: resource.id,
                actionName: action.name,
                data: form,
                onUploadProgress,
            });
        }
    };

    /**
     * Get Asset Types
     * @return {Promise<UploadType[]>}
     */
    const getAssetTypes = async (): Promise<UploadType[]> => {
        const results = await api.resourceAction({ resourceId: 'AssetType', actionName: 'listForUpload' });
        if (results.status == 200) {
            const records: UploadType[] = Flat.unflatten(results.data.data);
            if (records) {
                return records;
            }
        }
        return [];
    };

    /**
     * Get Asset Type by Id
     * @param {String} keywords
     * @return {Promise<UploadType>}
     */
    const getAssetType = async (id: string): Promise<UploadType> => {
        const results = await api.recordAction({ recordId: id, resourceId: 'AssetType', actionName: 'getForUpload' });
        if (results.status == 200) {
            const record: UploadType = Flat.unflatten(results.data.record.params);
            if (record) {
                return record;
            }
        }
        return null;
    };

    // Set up - Called on start
    useEffect(() => {
        // Track component mount (initialize) state
        let mounted = true;
        switch (resource.id) {
            // Set up upload types with asset types
            case UploadResources.Asset:
                getAssetTypes().then((types) => {
                    if (mounted && types) {
                        setTypes(types);
                    }
                });
                break;
            // Set up upload types with curated type
            case UploadResources.Curated:
                getAssetType(record.params.type).then((type) => {
                    if (mounted && type) {
                        setTypes([type]);
                        setType(type);
                    }
                });
                break;
        }

        // Return callback to perform action when component is unmounted
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <Box padding="20px" py="lg">
            {/* Select types */}
            <FormGroup id="uploadType" style={{ display: types && types.length > 0 ? 'block' : 'none' }}>
                <Label fontSize="16px" required>
                    Type
                </Label>
                <Label style={{ color: 'blue', fontSize: 11 }}>Please select a type</Label>
                <Box style={{ margin: 4, display: 'flow' }}>
                    {types.map((item) => {
                        return (
                            <Box key={item.id + '_box'} style={{ marginRight: 10, display: 'inline-flex', alignItems: 'center' }}>
                                <input
                                    style={{ height: 20, width: 20, margin: 'auto' }}
                                    type="radio"
                                    id={item.id}
                                    name={item.id}
                                    checked={type?.id === item.id}
                                    value={item.id}
                                    onChange={onTypeChanged}
                                />
                                <label style={{ fontSize: 14, margin: 8 }} htmlFor={item.id}>
                                    {item.name}
                                </label>
                            </Box>
                        );
                    })}
                </Box>
            </FormGroup>

            {/* Enter keywords */}
            <FormGroup id="uploadType" style={{ display: types && types.length > 0 ? 'block' : 'none' }}>
                <Label fontSize="16px">Keywords</Label>
                <Label style={{ color: 'blue', fontSize: 11 }}>Please enter comma separated keywords</Label>
                <Input style={{ marginLeft: 0 }} onChange={onKeywordsChanged} ml="default" />
            </FormGroup>

            {/* File Upload box */}
            {(!types || types.length < 1 || type) && (
                <Box style={{ marginTop: 20, marginBottom: 20 }}>
                    <Label required fontSize="16px">
                        Assets
                    </Label>
                    <DropZone
                        files={uploads.map(u=>u.file)}
                        uploadLimitIn={'MB'}
                        validate={{ maxSize: Number(type?.maxSizeBytes), mimeTypes: type?.mimeTypes }}
                        multiple={true}
                        onChange={onUpload}
                    />
                </Box>
            )}

            {/* Upload Details */}
            {uploads && uploads.length > 0 && (
                <Box style={{ overflowX: 'auto' }} pt="x4">
                    <Table style={{ minWidth: 1000 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>id</TableCell>
                                <TableCell></TableCell>
                                <TableCell>File</TableCell>
                                <TableCell>Keywords <div style={{color: 'gray', fontSize: 11}}>(comma separated)</div></TableCell>
                                <TableCell>Thumbnail</TableCell>
                                <TableCell>Preview</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uploads.map((upload, index) => {
                                return (
                                    <TableRow key={+upload.id}>
                                        <TableCell>#{upload.id}</TableCell>
                                        <TableCell style={{ minWidth: 50 }}>
                                            <ProgressBar
                                                done={Boolean(upload.done)}
                                                success={Boolean(upload.success)}
                                                progress={upload.progress ? +upload.progress || 0 : 0}
                                                strokeWidth={10}
                                                size={50}
                                                fontSize={9}
                                                fontColor="#5e5e5e"
                                                bgColor="#c7c7c7"
                                                progressColor={upload.success ? 'seagreen' : ( !upload.progress ? 'transparent' :  (upload.done ? 'red' : 'seagreen'))}
                                                onClickReload={() => submitSingle(type, upload, index)}
                                            />
                                        </TableCell>
                                        <TableCell>{upload.file.name}</TableCell>
                                        <TableCell>
                                        <FormGroup>
                                            <Input value={String(upload.keywords || '')} style={{ marginLeft: 0 }} onChange={(event: any) => onUploadKeywordsChanged(event, index)} ml="default" />
                                        </FormGroup>
                                        </TableCell>
                                        <TableCell>
                                            <DropZone
                                                uploadLimitIn={'MB'}
                                                validate={{ maxSize: thumbnailMaxSize, mimeTypes: thumbnailMimeTypes }}
                                                multiple={false}
                                                onChange={(files) => onUploadThumbnail(files, index)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <DropZone
                                                uploadLimitIn={'MB'}
                                                validate={{ maxSize: previewMaxSize, mimeTypes: previewlMimeTypes }}
                                                multiple={false}
                                                onChange={(files) => onUploadPreview(files, index)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            )}

            {/* Submit button*/}
            <Box style={{ marginTop: 20, marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                <Button
                    disabled={types && types.length > 0 && (!type || !uploads || uploads.length < 1)}
                    style={{ margin: 'auto' }}
                    variant="primary"
                    onClick={onClick}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};
export default UploadAsset;
