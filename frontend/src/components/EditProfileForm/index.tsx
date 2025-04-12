import React from "react";
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
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface IDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export const EditProfileForm: React.FC<IDialogProps> = ({
  isOpen,
  handleClose,
}) => {
  const { user, updateUser, deleteUser, signOut } = useAuth();
  const [deleteCounter, setDeleteCounter] = React.useState(0);

  const editProfileSchema = z
    .object({
      name: z.string().min(1, "Nome é obrigatório."),
      email: z.string().email("E-mail inválido."),
      password: z.string().refine((val) => val === "" || val.length >= 6, {
        message: "A senha deve ter pelo menos 6 caracteres.",
      }),
      password_confirmation: z
        .string()
        .refine((val) => val === "" || val.length >= 6, {
          message: "A confirmação da senha deve ter pelo menos 6 caracteres.",
        }),
      addresses: z
        .array(
          z.object({
            id: z.string().or(z.number()).optional(),
            userId: z.string().or(z.number()).optional(),
            street: z.string().min(1, "Logradouro é obrigatório."),
            city: z.string().min(1, "Cidade é obrigatória."),
            state: z.string().min(2, "Estado é obrigatório."),
            type: z.string().min(1, "Tipo é obrigatório."),
            zip_code: z
              .string()
              .min(8, "CEP inválido.")
              .max(8, "CEP inválido."),
            neighborhood: z.string().nonempty("Bairro é obrigatório."),
            number: z.string().nonempty("Número é obrigatório."),
            complement: z.string().optional(),
          })
        )
        .nonempty(),
    })
    .superRefine(({ password, password_confirmation }, ctx) => {
      if (
        (password || password_confirmation) &&
        password !== password_confirmation
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "As senhas não conferem.",
          path: ["password"],
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "As senhas não conferem.",
          path: ["password_confirmation"],
        });
      }
    });

  type IEditFormSchema = z.infer<typeof editProfileSchema>;

  const methods = useForm<IEditFormSchema>({
    mode: "onBlur",
    shouldUnregister: true,
    shouldFocusError: true,
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      password_confirmation: "",
      addresses: user?.addresses || [],
    },
    resolver: zodResolver(editProfileSchema),
  });

  const { control, handleSubmit } = methods;

  const { fields } = useFieldArray({
    control,
    name: "addresses",
  });

  const onSubmit = async (data: IEditFormSchema) => {
    const { name, email, password, addresses } = data;
    if (user) {
      await updateUser({
        id: user.id,
        name,
        email,
        password,
        addresses: addresses.map((address) => {
          delete address.id;
          delete address.userId;
          return {
            ...address,
            complement: address.complement || "",
          };
        }),
      });
    }
  };

  const handleDelete = async () => {
    if (deleteCounter === 0) {
      setDeleteCounter(1);
      setTimeout(() => setDeleteCounter(0), 2000);
    }
    if (deleteCounter === 1) {
      setDeleteCounter(0);
      if (user) {
        await deleteUser(user.id).then(() => {
          signOut();
          // handleClose();
        });
      }
    }
  };

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

  return (
    <FormProvider {...methods}>
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
            maxWidth: "1200",
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
            <Stack direction={"row"} spacing={2}>
              <Stack sx={{ flex: 1, flexGrow: 2 }}>
                <TextField
                  autoFocus
                  placeholder="Digite seu nome"
                  type="text"
                  name="name"
                />

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

                <TextField
                  placeholder="Confirme a senha"
                  type="password"
                  name="password_confirmation"
                />
              </Stack>
            </Stack>

            <Box mt={2}>
              <Stack
                direction="row"
                justifyContent="flexstart"
                alignItems="center"
              >
                <Typography variant="body1">Endereço</Typography>
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
                          onBlurEvent={handleGetAddressByCEP}
                          maxLength={8}
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
          </Box>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{ width: "100%", mt: 2, mb: 1 }}
          >
            <Button
              type="button"
              variant={deleteCounter > 0 ? "contained" : "text"}
              color="error"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={handleDelete}
            >
              {deleteCounter === 0 ? "Excluir Usuário" : "Confirma ?"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px" }}
              onClick={handleClose}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1, height: "40px", color: "#000" }}
            >
              Atualizar dados
            </Button>
          </Stack>
        </DialogContent>
        <DevTool control={control} />
      </Dialog>
    </FormProvider>
  );
};
