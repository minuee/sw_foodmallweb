import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


type AlertProps = {
    open? : boolean,
    isConfirm? : boolean,
    setOpen(bool:boolean): void;
    title? : string,
    contents? : any,
}

const AlertDialog: React.FC<AlertProps> = ({ open = false, isConfirm = false, setOpen, title = "알림", contents}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
        <Dialog
            open={open}
            onClose={setOpen}
            style={{minWidth:'200px'}}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="customized-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    { contents ?? ""}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    isConfirm && (
                        <Button onClick={handleClose}>No</Button>
                    )
                }
                <Button onClick={handleClose} autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}


export default AlertDialog;