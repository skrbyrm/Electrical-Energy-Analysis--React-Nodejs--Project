import React, { useEffect } from "react";
import FormAddUser from "../../components/FormAddUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../state/index";
import FlexBetween from "components/FlexBetween";
import { Box} from "@mui/material";

const AddUser = () => {
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
  return (
    <FlexBetween>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ height: '100%', width: '100%', margin: '1.5rem 2.5rem' }}
      >
        <FormAddUser />
      </Box>
    </FlexBetween>
  );
};

export default AddUser;
