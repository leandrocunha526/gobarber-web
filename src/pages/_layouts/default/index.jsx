import React from "react";
import Header from "../../../components/Header";
import { Wrapper } from "./styles";
import PropTypes from "prop-types";

export default function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <Header />
            {children}
        </Wrapper>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.element.isRequired,
}
