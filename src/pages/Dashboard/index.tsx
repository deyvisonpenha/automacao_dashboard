import React, {useEffect, useState} from 'react';
import {IoDiceOutline} from 'react-icons/io5';
import {Dashboard, ListDevices, Device} from '../../styles/Dashboard';
import serverApi from '../../services/api';
import io from 'socket.io-client'; 

interface Device {
  id: number;
  name: string;
  status: boolean;
}

function Home() {
  const [devices, setDevices] = useState<Device[]>([])

  useEffect(()=> {
    handleSocketIo();
    serverApi.get("/device").then( response => {
      setDevices(response.data)
    });
  },[]);

  const handleSocketIo = () => {
    const socket = io("http://localhost:3333", {transports: ['websocket']});
    
    socket.on("connect", () => {
      // console.log("Connected Socketio_Id: ",socket.id);
    });
    
    socket.on('device', () => {
      //console.log("sockerDevice: ", device)
      serverApi.get("/device").then( response => {
        setDevices(response.data)
      });
    }) 
  }

  return (
      <Dashboard>
        <h1>Meus Aparelhos</h1>
        <h3> Equipamentos Cadastrados</h3>

        <ListDevices>
          {devices.map( device => (
              <Device key={device.id} >
                <IoDiceOutline size={90} color={"#fff"}/>
                <strong>{device.name}</strong>
                {device.status ? 
                  <p style={{color: "#008000" }}>Ativado</p> : 
                  <p style={{color: "#ff0000"}}>Desativado</p>
                }
              </Device>
            ) 
          )}
        </ListDevices>
      </Dashboard>
  );
}

export default Home;
