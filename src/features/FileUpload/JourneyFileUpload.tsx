import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import { Button, Alert, Box } from '@mui/material';
import FileServices from '../../services/files';
import { useAppSelector } from '../../app/hooks';
import { selectCredential } from '../login/userSlice';
// import { addJourneys } from './journeySlice';
import { NotificationType, Severity } from './StationFileUpload';

registerPlugin(FilePondPluginFileValidateType);

/**
 * Renders a drag-and-drop file upload box.
 */
export default function JourneyFileUpload(): JSX.Element {
  // props: StationFileUploadProps,
  const [file, setFile] = useState<FilePondFile | null>(null);
  const [notify, setNotify] = useState<NotificationType | null>(null);
  const token = useAppSelector(selectCredential);
  // const dispatch = useAppDispatch();

  const handleUpdateFile = (fileItem: Array<FilePondFile>) => {
    if (fileItem.length > 0) {
      setFile(fileItem[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const response = await FileServices.fileUpload(
        file,
        'journeys/file',
        token,
      );
      // if (response.data.added) {
      //   dispatch(addJourneys(response.data.added));
      // }
      if (response.status !== 201) {
        setNotify({
          severity: Severity.Error,
          message: response.data,
        });
      } else if (response.data.disregarded.length > 0) {
        setNotify({
          severity: Severity.Warning,
          message: `The following journeys has been disregarded:\n ${response.data.disregarded}.\n ${response.data.message}.`,
        });
      } else {
        setNotify({
          severity: Severity.Success,
          message: 'All journeys created',
        });
      }
    }
  };

  return (
    <Box>
      {notify && (
        <Alert
          sx={{ width: '40vw', whiteSpace: 'pre-line' }}
          severity={notify.severity}
          onClose={() => setNotify(null)}
        >
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
