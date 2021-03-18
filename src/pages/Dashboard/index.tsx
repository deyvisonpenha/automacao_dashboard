import React, {useEffect, useState} from 'react';
import {IoDiceOutline} from 'react-icons/io5';
import {Dashboard, ListDevices, Device} from '../../styles/Dashboard';
import serverApi from '../../services/api';
import io from 'socket.io-client'; 
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

interface IDevice {
  id: number;
  name: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 62,
      height: 30,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(26px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 34,
      height: 28,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

function Home() {
  const [devices, setDevices] = useState<IDevice[]>([])
  const socket = io("http://localhost:3333", {transports: ['websocket']});

  useEffect(()=> {
    devices && serverApi.get("/device").then( response => {
      setDevices(response.data)
    });
  },[]);

  socket.on('device', (deviceFromApi: IDevice) => {
    const newDevices = devices.map( (device: IDevice) => {
      if(device.id === deviceFromApi.id)
        return deviceFromApi
      else
        return device
    });
    setDevices(newDevices);
  }) 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, selecteDevice: IDevice) => { 
    serverApi.patch(`/device/${selecteDevice.id}`, {status:event.target.checked})
    .then( response => {
      const newDevices = devices.map( (device: IDevice) => {
        if(device.id===selecteDevice.id)
          return response.data
        else
          return device
      });
      setDevices(newDevices);
    });
  };

  return (
      <Dashboard>
        <h1>Meus Aparelhos</h1>
        <h3> Equipamentos Cadastrados</h3>

        <ListDevices>
          {devices.map( device => (
              <Device key={device.id} >
                <IoDiceOutline size={90} color={"#fff"}/>
                <strong>{device.name}</strong>
                
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1} style={{color: "#fff"}}>
                    <Grid item >Off</Grid>
                    <Grid item>
                      <IOSSwitch checked={device.status} onChange={e => handleChange(e,device)} name="deviceStatus" />
                    </Grid>
                    <Grid item>On</Grid>
                  </Grid>
                </Typography>

                {device.status ? 
                  <p style={{color: "#52d869" }}>Ativado</p> : 
                  <p style={{color: "#000000"}}>Desativado</p>
                }
              </Device>
            ) 
          )}
        </ListDevices>
      </Dashboard>
  );
}

export default Home;
