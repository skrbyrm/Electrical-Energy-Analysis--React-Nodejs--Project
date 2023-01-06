import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  TextField,
  Input,
  Select,
  MenuItem,
  FormHelperText,
  Button,
} from "@mui/material";
import config from "config";

const FormEditUser = () => {
  const baseurl = config.urls.REACT_APP_BACKEND_SERVER;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`${baseurl}/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${baseurl}/users/${id}`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <form onSubmit={updateUser}>
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
          <FormHelperText>Select user role</FormHelperText>
        </FormControl>
        <p className="has-text-centered">{msg}</p>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  );
};

export default FormEditUser;
