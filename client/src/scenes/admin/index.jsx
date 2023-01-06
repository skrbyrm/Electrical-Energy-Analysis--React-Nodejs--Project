import React, { useState, useEffect }  from "react";
import { Box, Button,Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Header from "components/Header";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../state/index";
import config from "../../config";
import axios from "axios";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(config.urls.BACKEND_SERVER_USERS);
      setUsers(response.data);

    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMINS" subtitle="Managing admins and list of admins" />
      <Box>
        <div>
          <h1 className="title">Users</h1>
          <h2 className="subtitle">List of Users</h2>
          <Link to="/users/add" className="button is-primary mb-2">
            Add New
          </Link>
          <Table className="table is-striped is-fullwidth">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.uuid}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Link
                      to={`/users/edit/${user.uuid}`}
                      className="button is-small is-info"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => deleteUser(user.uuid)}
                      className="button is-small is-danger"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Box>
    </Box>
  );
};

export default Admin;
