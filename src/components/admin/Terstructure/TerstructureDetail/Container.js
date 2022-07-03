import React, { useEffect, useMemo } from "react";
import {
  TextField,
  Grid,
  Container,
  Paper,
  Autocomplete,
  Box,
} from "@mui/material";
import ProgressButton from "../../../common/ProgressButton";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { clear, getAll } from "../../../../actions/terstructureActions";
import { useDispatch, useSelector } from "react-redux";
import { makeTree, flatTree } from "../../../ui/TreeComponent";

yup.addMethod(yup.string, "isNumberSting", function (errorMessage) {
  return this.test("test-code-type", errorMessage, function () {
    const { path, createError, originalValue } = this;

    return (
      !originalValue ||
      (originalValue && originalValue.match(/^[0-9]*$/)) ||
      createError({
        path,
        message: errorMessage,
      })
    );
  });
});

yup.addMethod(yup.number, "isNotEqualYourSelf", function (errorMessage) {
  return this.test("test-code-type", errorMessage, function () {
    const { path, createError, originalValue, parent } = this;

    return (
      !(originalValue && parent?.id === originalValue) ||
      createError({
        path,
        message: errorMessage,
      })
    );
  });
});

const schema = yup.object().shape({
  name: yup.string().required("Поле не может быть пустым"),
  id_parent: yup
    .number()
    .nullable()
    .notRequired()
    .positive()
    .integer()
    .isNotEqualYourSelf(
      "Само подразделение не может выступать в качестве родительского"
    ),
  code: yup
    .string()
    .nullable()
    .notRequired()
    .isNumberSting("Поле должно иметь символы 0-9"),
});

const TerstructureDetailContainer = ({
  isSendingRequest,
  terstructure,
  handlerButtonSave,
}) => {
  const dispatch = useDispatch();
  //const [parent, setParent] = useState(null);

  const terstructureList = useSelector(({ terstructure }) => {
    return terstructure.terstructureList.filter((t) => t.id_parent !== null);
  });

  useEffect(() => {
    const fetchTerstructure = async () => {
      dispatch(getAll());
    };

    fetchTerstructure();

    return () => {
      dispatch(clear());
    };
  }, [dispatch]);

  const memoizedTreeData = useMemo(
    () => flatTree(makeTree(terstructureList, 1)),
    [terstructureList]
  );

  const parentValue = (options, selected) => {
    var value = options.filter((value) => value.id === selected);
    return value.length ? value[0] : null;
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: terstructure,
    resolver: yupResolver(schema),
  });

  const submitForm = async (terstructure) => {
    await handlerButtonSave(terstructure);
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
          <Grid item>
            <Controller
              name="id_parent"
              control={control}
              render={({ field: { ref, ...field }, fieldState: { error } }) => {
                //console.log(field);
                return (
                  <Autocomplete
                    clearOnEscape
                    getOptionLabel={(option) => option?.name || ""}
                    value={parentValue(memoizedTreeData, field?.value)}
                    onChange={(event, value) =>
                      field.onChange(value?.id || null)
                    }
                    options={memoizedTreeData}
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          <Box sx={{ pl: (option.tree_level - 1) * 2 }}>
                            {option.name}
                          </Box>
                        </li>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        error={!!errors?.id_parent?.message}
                        helperText={errors?.id_parent?.message}
                        label="Родительское подразделение"
                        variant="standard"
                      />
                    )}
                  />
                );
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              {...register("code")}
              error={!!errors?.code?.message}
              helperText={errors?.code?.message}
              variant="standard"
              label="Код"
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

export default TerstructureDetailContainer;

/*
          <Grid item>
            <Autocomplete
              {...register("id_parent")}
              options={memoizedTreeData}
              getOptionLabel={(option) => option.name}
              id="clear-on-escape"
              clearOnEscape
              renderOption={(props, option) => {
                return (
                  <li {...props} key={option.id}>
                    <Box sx={{ pl: option.tree_level * 2 }}>{option.name}</Box>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Выберите родительское подразделение"
                  variant="standard"
                />
              )}
            />
          </Grid>
 */
