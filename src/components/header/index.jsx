// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import Notifications from "../notifications";
import logo from "../../assets/logo.svg";
import { Container, Content, Profile } from "./styles";
import { Link } from "react-router-dom";

export default function Header() {
    const profile = useSelector((state) => state.user.profile);
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logo} alt="GoBarber" />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>{profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img
                            src={
                                profile.avatar !== null
                                    ? profile.avatar.url
                                    : "https://api.adorable.io/avatars/50/abott@adorable.png"
                            }
                            alt="Avatar"
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
