import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { Button, Alert, Box } from '@mui/material';
import FileServices from '../../services/files';

registerPlugin(FilePondPluginFileValidateType);

/**
 * Define severity of `<Alert />`.
 */
export enum Severity {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

/**
 * Type of state for notify.
 */
export interface NotificationType {
  severity: Severity;
  message: string;
}

// export interface StationFileUploadProps {
//   /** A state to determine whether to show the file upload dialog. */
//   showBox: boolean;

//   /** The `set` function for `showBox`. */
//   setShowBox: Dispatch<SetStateAction<boolean>>;
// }

/**
 * Renders a drag-and-drop file upload box.
 */
export default function StationFileUpload(): JSX.Element {
// props: StationFileUploadProps,
  const [file, setFile] = useState<FilePondFile | null>(null);
  const [notify, setNotify] = useState<NotificationType | null>(null);

  const handleUpdateFile = (fileItem: Array<FilePondFile>) => {
    if (fileItem.length > 0) {
      setFile(fileItem[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const response = await FileServices.fileUpload(file, 'stations/file');
      if (response.status !== 201) {
        setNotify({
          severity: Severity.Error,
          message: response.data,
        });
      } else if (response.data.disregarded.length > 0) {
        setNotify({
          severity: Severity.Warning,
          message: `The following stations has been disregarded: ${response.data.disregarded}`,
        });
      } else {
        setNotify({
          severity: Severity.Success,
          message: 'All stations created',
        });
      }
    }
  };

  return (
    <Box>
      {notify && (
        <Alert severity={notify.severity} onClose={() => setNotify(null)}>
          {notify.message}
        </Alert>
      )}
      <FilePond
        allowMultiple={false}
        onupdatefiles={(fileItems) => handleUpdateFile(fileItems)}
        acceptedFileTypes={['text/csv']}
        maxFiles={1}
      />
      <Button onClick={handleUpload} disabled={!file}>
        Upload File
      </Button>
    </Box>
  );
}
