import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";
import { signUpRequest } from "../../store/modules/auth/actions";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string()
        .email("Insira um e-mail válido")
        .required("O e-mail é obrigatório"),
    password: Yup.string()
        .min(6, "No mímino 6 caracteres")
        .required("A senha é obrigatória"),
});

export default function SignUp() {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth.loading);
    const [formData, setFormData] = useState({});

    function handleSubmit({ name, email, password }) {
        dispatch(signUpRequest(name, email, password));
        setFormData({}); // Limpar os campos do formulário após o envio
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <img src={logo} alt="GoBarber" title="Gobarber logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha secreta"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                />
                <button type="submit">
                    {loading ? "Criando sua conta..." : "Criar"}
                </button>
                <Link to="/">Já tenho um login</Link>
            </Form>
        </>
    );
}
