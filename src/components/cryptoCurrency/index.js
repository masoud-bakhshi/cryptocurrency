import React from "react";
import { makeStyles, Button, Typography } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import CryptoSetting from "./cryptoSetting";
import CryptoIndex from "./src";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  title: {
    marginTop: theme.spacing(4),
    width: theme.spacing(20),
    height: theme.spacing(5),
    margin: "auto",
  },
  root1: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
      // paddingRight: theme.spacing(2),
    },
  },
}));
function CryptoCurrency() {
  const classes = useStyles();

  const [settingDialog, setSettingDialog] = useState(false);
  const [cryptoList, setCryptoList] = useState([]);
  const [progress, setProgress] = useState(true);
  const [settingRefresh, setSettingRefresh] = useState(true);
  useEffect(() => {
    if (settingRefresh === true) {
      setProgress(false);
    }
  }, [settingRefresh]);

  const settingButt = () => {
    setSettingDialog(true);
  };

  return (
    <div>
      {progress ? (
        <div className={classes.root1} align="center">
          <Typography variant="h6" gutterBottom>
            Please wait ...
          </Typography>
          <LinearProgress />
          <Typography variant="h6" gutterBottom>
            List of CryptoCurrency is loading
          </Typography>
        </div>
      ) : null}
      {!progress && (
        <div>
          <div
            className={classes.root}
            align="center"
            style={{ marginTop: "0px" }}
          >
            <Typography variant="h4" gutterBottom>
              DeveloperCodeBase
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={settingButt}
              startIcon={<PostAddIcon />}
            >
              Config
            </Button>
          </div>
          <div>
            <CryptoIndex> </CryptoIndex>
          </div>
          {settingDialog && (
            <CryptoSetting
              open={settingDialog}
              setOpen={setSettingDialog}
              setRefresh={setSettingRefresh}
            ></CryptoSetting>
          )}
        </div>
      )}
    </div>
  );
}

export default CryptoCurrency;
