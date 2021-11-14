import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  CssBaseline,
  Paper,
  Grid,
  Typography,
  makeStyles,
  InputLabel,
  FormControl,
  Select,
} from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { multiStepContext } from "../cryptoCurrency/StepContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    height: "100vh",
    marginTop: theme.spacing(3),
  },

  butt: {
    marginRight: "20px",
    marginLeft: "20px",
  },

  image: {
    backgroundImage: "url(/assets/img/cryptosetting.svg)",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#fff",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  halfLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#fafafa",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  type: {
    color: "#000",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function CryptoSetting({ open, setOpen, setRefresh }) {
  const classes = useStyles();
  const [progress, setProgress] = useState(true);
  const { coinListLocal, setCoinListLocal } = useContext(multiStepContext);
  const [coinListName, setCoinListName] = useState([]);
  const [payload, setPayload] = useState(
    coinListLocal === null
      ? [
          "bitcoin",
          "ethereum",
          "litecoin",
          "bitcoin-cash",
          "binancecoin",
          "ripple",
          "polkadot",
          "dogecoin",
          "chainlink",
        ]
      : [
          coinListLocal[0],
          coinListLocal[1],
          coinListLocal[2],
          coinListLocal[3],
          coinListLocal[4],
          coinListLocal[5],
          coinListLocal[6],
          coinListLocal[7],
          coinListLocal[8],
        ]
  );
  const getCoinList = async (setCoinListName, setProgress) => {
    try {
      await fetch("https://api.coingecko.com/api/v3/coins/list").then(
        (response) =>
          response
            .json()
            .then((data) => ({
              data: data,
              status: response.status,
            }))
            .then((res) => {
              setCoinListName(res.data);
              setProgress(false);
              // console.log(res.data);
            })
      );
    } catch (error) {}
  };
  useEffect(() => {
    console.log(payload);
    getCoinList(setCoinListName, setProgress);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickVariant = (variant) => () => {
    setOpen(false);
  };
  const addCoin = () => {
    setCoinListLocal([
      payload[0],
      payload[1],
      payload[2],
      payload[3],
      payload[4],
      payload[5],
      payload[6],
      payload[7],
      payload[8],
    ]);
    setRefresh(true);
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Crypto config
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            className={classes.halfLeft}
          >
            <div className={classes.paper}>
              <div style={{ direction: "ltr" }}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.type}
                >
                  just choose 9 coin and see the report
                </Typography>
              </div>
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
                    <ValidatorForm
                      debounceTime={1500}
                      className={classes.form}
                      onSubmit={addCoin}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[0]}
                              onChange={(e) => {
                                setPayload({ ...payload, 0: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[1]}
                              onChange={(e) => {
                                setPayload({ ...payload, 1: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[2]}
                              onChange={(e) => {
                                setPayload({ ...payload, 2: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[3]}
                              onChange={(e) => {
                                setPayload({ ...payload, 3: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[4]}
                              onChange={(e) => {
                                setPayload({ ...payload, 4: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[5]}
                              onChange={(e) => {
                                setPayload({ ...payload, 5: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[6]}
                              onChange={(e) => {
                                setPayload({ ...payload, 6: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[7]}
                              onChange={(e) => {
                                setPayload({ ...payload, 7: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>

                          <FormControl
                            variant="outlined"
                            fullWidth
                            className={classes.formControl}
                          >
                            <InputLabel htmlFor="outlined-age-native-simple"></InputLabel>
                            <Select
                              native
                              fullWidth
                              label=" CryptoName0"
                              value={payload[8]}
                              onChange={(e) => {
                                setPayload({ ...payload, 8: e.target.value });
                              }}
                            >
                              {coinListName &&
                                coinListName.map((coin) => (
                                  <option value={coin.id}>{coin.name}</option>
                                ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          //   disabled={submitted}
                          className={classes.submit}
                        >
                          Modify
                        </Button>
                      </Grid>
                    </ValidatorForm>
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grid>
      </Dialog>
    </div>
  );
}
