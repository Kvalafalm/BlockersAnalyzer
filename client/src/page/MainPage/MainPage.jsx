import { useDispatch, useSelector } from "react-redux"
import { styled } from "@mui/material/styles"
import { Route, Switch as SwitchR } from "react-router"
import { useHistory } from "react-router-dom"
import {
  BublecharPage,
  Import,
  HistogramPage,
  StakedareaPage,
  EditData,
  TimeLinePage,
  InstructionsPage,
} from "../index"
import {
  Button,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  Switch,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import IconButton from "@mui/material/IconButton"
import { useEffect, useState } from "react"
import MuiAppBar from "@mui/material/AppBar"
import { Box } from "@mui/system"
import { appActions } from "../../store/app"
import Stack from "@mui/material/Stack"
import { FiltredBox, Settings } from "../../components"
import { Timeline } from "@material-ui/icons"
import { Help } from "@mui/icons-material"
//import HelpIcon from '@mui/icons-material/Help';
const drawerWidth = 130

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 2,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `0px`,
    }),
  })
)

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

export const MainPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  //const { page } = useSelector(state => state.appReducer)
  const [open, setOpen] = useState(true)

  const [showFilter, setShowFilter] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    dispatch(appActions.uploadDataFromServer())
  }, [])

  const handleChangeSwitch = () => {
    setShowFilter(!showFilter)
  }

  const handleShowSettings = () => {
    setShowSettings(true)
  }
  const handleCloseSettings = () => {
    setShowSettings(false)
  }

  const label = { inputProps: { "aria-label": "Switch demo" } }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Button
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            Sidebar
          </Button>
          <Typography variant="h6" noWrap component="div">
            Blockers analyzer
          </Typography>
          <IconButton>
            <SettingsIcon color="disabled" onClick={handleShowSettings} />
          </IconButton>
          <IconButton>
            <Help
              color="disabled"
              onClick={() => {
                history.push("/instruction")
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Button onClick={handleDrawerClose}>Закрыть</Button>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            key={"Import"}
            onClick={() => {
              history.push("/Import")
            }}
          >
            <ListItemText primary={"Import"} />
          </ListItem>
          <ListItem
            button
            key={"EditData"}
            onClick={() => {
              history.push("/EditData")
            }}
          >
            <ListItemText primary={"Edit data"} />
          </ListItem>
          <ListItem
            button
            key={"Histogramm"}
            onClick={() => {
              history.push("/Histogramm")
            }}
          >
            <ListItemText primary={"Histogramm"} />
          </ListItem>
          <ListItem
            button
            key={"Bublechar"}
            onClick={() => {
              history.push("/Bublechar")
            }}
          >
            <ListItemText primary={"Bublechar"} />
          </ListItem>
          <ListItem
            button
            key={"Stakedarea"}
            onClick={() => {
              history.push("/Stakedarea")
            }}
          >
            <ListItemText primary={"Stakedarea Char"} />
          </ListItem>
          <ListItem
            button
            key={"timeline"}
            onClick={() => {
              history.push("/timeline")
            }}
          >
            <Timeline />
          </ListItem>
          <Divider />
          <ListItem>
            <Typography>Filter</Typography>
          </ListItem>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Off</Typography>
            <Switch
              {...label}
              defaultChecked={showFilter}
              onChange={handleChangeSwitch}
            />
            <Typography>On</Typography>
          </Stack>
        </List>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <SwitchR>
          <Route exact={true} path="/">
            <Import />
          </Route>
          <Route exact={true} path="/Import">
            <Import />
          </Route>
          <Route exact={true} path="/Histogramm">
            <HistogramPage />
          </Route>
          <Route exact={true} path="/Bublechar">
            <BublecharPage />
          </Route>
          <Route exact={true} path="/Stakedarea">
            <StakedareaPage />
          </Route>
          <Route exact={true} path="/EditData">
            <EditData />
          </Route>
          <Route exact={true} path="/timeline">
            <TimeLinePage />
          </Route>
          <Route exact={true} path="/instruction">
            <InstructionsPage />
          </Route>
        </SwitchR>
      </Main>
      <FiltredBox show={showFilter} />
      <Settings open={showSettings} onClose={handleCloseSettings}></Settings>
    </Box>
  )
}