import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Button
} from '@mui/material';
import config from 'config';



const FormAddUser = () => {
  const baseurl = config.urls.REACT_APP_BACKEND_SERVER;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [role, setRole] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseurl}/users`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate('/admin');
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
  <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <form onSubmit={saveUser}>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Email</FormLabel>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            placeholder="******"
            required
          />
        </FormControl>
        <FormControl fullWidth>
        <FormLabel>Role</FormLabel>
        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </Select>
        <FormHelperText error>{msg}</FormHelperText>
      </FormControl>
      <FormControl fullWidth>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </FormControl>
    </form>
  </div>
);

};

export default FormAddUser;
