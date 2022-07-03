import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { format, isValid, parseISO } from "date-fns";
import {
  Paper,
  Container,
  Grid,
  TextField,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ProgressButton from "../../../common/ProgressButton";
import {
  ControllerSwitch,
  ControllerAppDatePicker,
} from "../../../ui/withController/";

yup.addMethod(yup.date, "dateTypeError", function (errorMessage) {
  return this.test("test-date-type", errorMessage, function () {
    const { path, createError, originalValue } = this;
    return (
      (originalValue && originalValue.match(/\d{4}-\d{2}-\d{2}/)) ||
      createError({
        path,
        message: errorMessage,
      })
    );
  });
});

yup.addMethod(yup.date, "valideDate", function (errorMessage) {
  return this.test("test-date-value", errorMessage, function () {
    const { path, createError, originalValue } = this;
    // new Date ('0000-01-01') считается правильным, ошибка js parse(date)
    return (
      (originalValue &&
        isValid(parseISO(originalValue)) &&
        +originalValue.split("-")[0] >= 100) ||
      createError({
        path,
        message: errorMessage,
      })
    );
  });
});

const schema = yup.object().shape({
  fio: yup.string().required("Поле не может быть пустым"),
  email: yup
    .string()
    .required("Поле не может быть пустым")
    .email("Неверно заполнено поле email"),
  isDeleted: yup.boolean(),
  dateDeleted: yup.date().when("isDeleted", {
    is: true,
    then: yup
      .date()
      .nullable()
      .required("Поле не может быть пустым")
      .typeError("Дата заполнена некорректно")
      .dateTypeError("Дата заполнена некорректно")
      .valideDate("Несуществующая дата")
      .min(new Date(2000, 0, 1), "Дата не может быть меньше 31.01.1900.")
      .max(new Date(2099, 11, 31), "Дата не может быть больше 31.12.2099г."),
    otherwise: yup.date().nullable().notRequired(),
  }),
});

/*
schema
  .validate({
    fio: "Духанин Юрий",
    email: "supermann89@rambler.ru",
    isDeleted: true,
    dateDeleted: "2041-41-01",
  })
  .then(function (valid) {
    console.log("good");
    console.log(valid, ...arguments); // => true
  })
  .catch(function (err) {
    console.log("error");
    console.log(err.name, err.errors);
  });
*/
const UserDetailContainer = ({
  newTemplate = false,
  isSendingRequest,
  roleList = [],
  user,
  handlerButtonSave,
}) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fio: user?.fio ?? "",
      email: user?.email ?? "",
      isDeleted: !!user?.is_deleted,
      dateDeleted: user?.date_deleted || null,
    },
    resolver: yupResolver(schema),
  });

  const watchIsDeleted = watch("isDeleted");

  const [roles, setRoles] = useState(user?.roles || []);

  const submitForm = async (values) => {
    await handlerButtonSave({
      ...user,
      fio: values?.fio,
      email: values?.email,
      is_deleted: values?.isDeleted ? 1 : 0,
      date_deleted: values?.isDeleted
        ? format(values?.dateDeleted, "yyyy-MM-dd").toString()
        : null,
      roles: roles,
    });
  };

  const handleRoleChange = (event, id) => {
    if (event.target.checked) {
      setRoles([...roles, id]);
    } else {
      setRoles(roles.filter((roleId) => roleId !== id));
    }
  };

  //https://mobiscroll.com/date-time-picker-calendar?gclid=CjwKCAiA7dKMBhBCEiwAO_crFHDedyYeugHzZ7tDjhTXPMn5O8wFSkB-IaNC1M-_KEIZXNZObN8mAxoCLZcQAvD_BwE

  return (
    <Container maxWidth="sm" spacing={2}>
      <Paper>
        <Grid
          container
          direction="column"
          justifyContent="center"
          p={2}
          rowSpacing={2}
        >
          <Grid item>
            <TextField
              {...register("fio")}
              error={!!errors?.fio?.message}
              helperText={errors?.fio?.message}
              variant="standard"
              label="ФИО"
              required
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              {...register("email")}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
              variant="standard"
              label="Email"
              required
              fullWidth
            />
          </Grid>
          {!newTemplate && (
            <Grid item>
              <FormGroup row>
                <FormControlLabel
                  id="user-is_deleted"
                  margin="normal"
                  style={{ width: "200px", height: "60px" }}
                  control={
                    <ControllerSwitch control={control} name="isDeleted" />
                  }
                  label={watchIsDeleted ? "Удалён" : "Действующий"}
                />
                {watchIsDeleted && (
                  <ControllerAppDatePicker
                    control={control}
                    name="dateDeleted"
                    label="Дата удаления"
                    textFieldProps={{
                      sx: { width: "17rem;" },
                    }}
                  />
                )}
              </FormGroup>
            </Grid>
          )}
          <Grid item>
            <FormGroup column="true">
              <Typography variant="h5" component="h5">
                Роли:
              </Typography>
              {roleList.map((role) => {
                return (
                  <FormControlLabel
                    id={`id-user-role${role.id}`}
                    margin="normal"
                    key={role.id}
                    control={
                      <Switch
                        checked={roles.includes(role.id)}
                        onChange={(event) => handleRoleChange(event, role.id)}
                        name={`user-role${role.id}`}
                      />
                    }
                    label={role.name}
                  />
                );
              })}
            </FormGroup>
          </Grid>
          <Grid item container justifyContent="center">
            <ProgressButton
              loading={isSendingRequest}
              disabled={!isValid}
              onClick={handleSubmit(submitForm)}
            >
              Сохранить
            </ProgressButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserDetailContainer;
