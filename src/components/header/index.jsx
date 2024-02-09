// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import Notifications from "../notifications";
import headerLogo from "../../assets/headerLogo.svg";
import { Container, Content, Profile } from "./styles";
import { Link } from "react-router-dom";

export default function Header() {
    const profile = useSelector((state) => state.user.profile);
    return (
        <Container>
            <Content>
                <nav>
                    <img src={headerLogo} alt="GoBarber" />
                    <Link to="/dashboard">Dashboard</Link>
                </nav>
                <aside>
                    <Notifications />
                    <Profile>
                        <div>
                            <strong>Olá, {profile.name}</strong>
                            <Link to="/profile">Meu perfil</Link>
                        </div>
                        <img
                            src={
                                profile.avatar !== null
                                    ? profile.avatar.url
                                    : `https://ui-avatars.com/api/?name=${profile.name}&size=32`
                            }
                            alt="Avatar"
                        />
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
