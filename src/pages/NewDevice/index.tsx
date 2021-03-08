import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {TextField, Button} from '@material-ui/core';
import {FaSave} from 'react-icons/fa';
import serverApi from '../../services/api'
import {Container} from '../../styles/NewDevice';

interface Device {
  name: string;
  status: boolean;
}

const NewDevice: React.FC = () => {
  const [device, setDevice] = useState<Device>({name: "", status: false})
  let history = useHistory();

  const handleSubmit = () => {
    serverApi.post("/device", device)

    history.push({
			pathname: "/",
		});
  }

  return (
    <Container>
      <h1>Cadastrar Dispositivo</h1>
      
      <form onSubmit={handleSubmit}>
        <TextField
          id="nameDevice"
          label="Nome Dispositivo" 
          variant="outlined"
          value={device.name}
          onChange={e=> setDevice(device => ({...device, name: e.target.value })) }
        />
        <TextField
          id="statusDevice"
          label="Status" 
          variant="filled"
          value="Desligado"
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        startIcon={<FaSave />}
        >
          Save
        </Button>
      </form>
    </Container>
  );
}

export default NewDevice;
