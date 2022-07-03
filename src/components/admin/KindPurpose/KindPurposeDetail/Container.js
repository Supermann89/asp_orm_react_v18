import React from "react";
import { TextField, Grid, Container, Paper } from "@mui/material";
import ProgressButton from "../../../common/ProgressButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Поле не может быть пустым"),
});

const KindPurposeDetailContainer = ({
  isSendingRequest,
  kindPurpose,
  handlerButtonSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ...kindPurpose,
    },
    resolver: yupResolver(schema),
  });

  const submitForm = async (values) => {
    await handlerButtonSave(values.name);
  };

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
              {...register("name")}
              error={errors?.name?.message ? true : false}
              helperText={errors?.name?.message}
              variant="standard"
              label="Наименование"
              required
              fullWidth
            />
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

export default KindPurposeDetailContainer;
