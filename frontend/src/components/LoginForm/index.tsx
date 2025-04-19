import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { TextField } from "../TextField";
import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../context/Auth";
import { Dropdown } from "../Dropdown";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const loginOnlySchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

const fullRegisterSchema = z
  .object({
    name: z.string().nonempty("Nome é obrigatório."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    password_confirmation: z
      .string()
      .min(6, "A confirmação da senha deve ter pelo menos 6 caracteres."),
    addresses: z.array(
      z.object({
        street: z.string().min(1, "Logradouro é obrigatório."),
        city: z.string().min(1, "Cidade é obrigatória."),
        state: z.string().min(2, "Estado é obrigatório."),
        type: z.string().min(1, "Tipo é obrigatório."),
        zip_code: z.string().min(8, "CEP inválido.").max(8, "CEP inválido."),
        neighborhood: z.string().nonempty("Bairro é obrigatório."),
        number: z.string().nonempty("Número é obrigatório."),
        complement: z.string().optional(),
      })
    ),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        path: ["password"],
        code: z.ZodIssueCode.custom,
        message: "As senhas não conferem.",
      });
      ctx.addIssue({
        path: ["password_confirmation"],
        code: z.ZodIssueCode.custom,
        message: "As senhas não conferem.",
      });
    }
  });

type LoginOnlySchema = z.infer<typeof loginOnlySchema>;
type FullRegisterSchema = z.infer<typeof fullRegisterSchema>;

interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const LoginForm: React.FC<IDialogProps> = ({ isOpen, handleClose }) => {
  const [newUser, setNewUser] = useState<boolean>(false);
  const { signIn, signUp } = useAuth();

  const methods = useForm<FullRegisterSchema | LoginOnlySchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      addresses: [
        {
          street: "",
          city: "",
          state: "",
          type: "",
          zip_code: "",
          neighborhood: "",
          number: "",
          complement: "",
        },
      ],
    },
    resolver: zodResolver(newUser ? fullRegisterSchema : loginOnlySchema),
  });

  useEffect(() => {
    newUser ? methods.setFocus("name") : methods.setFocus("email");
  }, [newUser]);

  useEffect(() => {
    methods.reset();
  }, []);

  const { control, handleSubmit } = methods;
  const { fields } = useFieldArray({ control, name: "addresses" });

  const handleGetAddressByCEP = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    const cep: string = e.target.value;

    if (cep.length < 8) {
      return;
    }

    axios
      .get<ViaCepResponse>(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => {
        if ("erro" in res.data) {
          return false;
        }
        const address = res.data;

        methods.setValue("addresses.0.state", address.estado);
        methods.setValue("addresses.0.city", address.localidade);
        methods.setValue("addresses.0.neighborhood", address.bairro);
        methods.setValue("addresses.0.street", address.logradouro);

        methods.trigger("addresses.0.state");
        methods.trigger("addresses.0.city");
        methods.trigger("addresses.0.neighborhood");
        methods.trigger("addresses.0.street");
        methods.setFocus("addresses.0.number");
      });
  };

  const onSubmit = async (data: any) => {
    if (newUser) {
      await signUp(data)
        .then(() => {
          methods.reset();
          handleClose();
        })
        .catch((error) => {
          console.error("Error during sign up:", error);
        });
    } else {
      await signIn({
        email: data.email,
        password: data.password,
      }).then(() => {
        methods.reset();
        handleClose();
      });
    }
  };

  return (
    <FormProvider {...methods} key={newUser ? "register" : "login"}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          "& .MuiDialog-paper": {
            // backgroundColor: "#242424",
            color: "#f4f4f4",
            width: "100%",
            maxWidth: () => (newUser ? "1200" : "400px"),
            borderRadius: "14px",
            overflow: "hidden",
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle align="center" fontSize={24}>
          Bem Vindo
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <Stack
              direction={newUser ? "row" : "column"}
              spacing={newUser ? 2 : 0}
            >
              <Stack sx={{ flex: 1, flexGrow: newUser ? 2 : 0 }}>
                {newUser && (
                  <TextField
                    autoFocus
                    placeholder="Digite seu nome"
                    type="text"
                    name="name"
                  />
                )}

                <TextField
                  autoFocus
                  placeholder="Digite seu e-mail"
                  name="email"
                />
              </Stack>
              <Stack sx={{ flex: 1 }}>
                <TextField
                  placeholder="Digite sua senha"
                  type="password"
                  name="password"
                />

                {newUser && (
                  <TextField
                    placeholder="Confirme a senha"
                    type="password"
                    name="password_confirmation"
                  />
                )}
              </Stack>
            </Stack>

            {newUser && (
              <Box mt={2}>
                <Stack
                  direction="row"
                  justifyContent="flexstart"
                  alignItems="center"
                >
                  <Typography variant="body1">Endereço</Typography>
                  {/* <IconButton
                    size="small"
                    onClick={() =>
                      append({
                        street: "",
                        city: "",
                        state: "",
                        type: "",
                        zip_code: "",
                        neighborhood: "",
                        number: "",
                        complement: "",
                      })
                    }
                  >
                    <AddIcon sx={{ color: "#fff" }} />
                  </IconButton> */}
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  {fields.map((field, index) => (
                    <Box key={field.id} sx={{ flex: 1 }}>
                      <Stack
                        // mt={2}
                        direction={"row"}
                        alignItems={"end"}
                        justifyContent={"stretch"}
                        spacing={2}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Dropdown
                            values={["Residencial", "Comercial"]}
                            name={`addresses.${index}.type`}
                            placeholder="Tipo (residencial/comercial)"
                          />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            name={`addresses.${index}.zip_code`}
                            placeholder="CEP"
                            maxLength={8}
                            onBlur={handleGetAddressByCEP}
                          />
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <Box sx={{ flex: 1 }}>
                          <TextField
                            name={`addresses.${index}.state`}
                            placeholder="Estado"
                          />
                        </Box>
                        <Box>
                          <TextField
                            name={`addresses.${index}.city`}
                            placeholder="Cidade"
                          />
                        </Box>
                        <Box>
                          <TextField
                            name={`addresses.${index}.neighborhood`}
                            placeholder="Bairro"
                          />
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <TextField
                          name={`addresses.${index}.street`}
                          placeholder="Logradouro"
                        />
                        <Box sx={{ flexGrow: 2 }}>
                          <TextField
                            name={`addresses.${index}.number`}
                            placeholder="Número"
                          />
                        </Box>
                      </Stack>
                      <TextField
                        name={`addresses.${index}.complement`}
                        placeholder="Complemento"
                      />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ width: "100%", mt: 2, mb: 1 }}
          >
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={() => {
                methods.setFocus("email");
                methods.reset();
              }}
            >
              Limpar dados
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
            >
              {newUser ? "Cadastrar" : "Entrar"}
            </Button>
          </Stack>
          <Button
            type="button"
            variant="text"
            fullWidth
            onClick={setNewUser(!newUser)}
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: "#fff",
              height: "40px",
            }}
          >
            {newUser ? "Já tenho cadastro" : "Fazer meu cadastro"}
          </Button>
        </DialogContent>
        <DevTool control={control} />
      </Dialog>
    </FormProvider>
  );
};
