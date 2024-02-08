import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
    height: 100%;
    background: linear-gradient(-90deg, #7159c1, #ab59c1);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;

        input {
            height: 44px;
            border-radius: 4px;
            border: 0;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;
            background: rgba(0, 0, 0, 0.1);

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            &:focus {
                background: rgba(0, 0, 0, 0.2);
            }

            &:hover {
                background: rgba(0, 0, 0, 0.2);
            }
        }

        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        button {
            height: 44px;
            border-radius: 4px;
            border: 0;
            padding: 0 15px;
            color: #fff;
            margin: 5px 0 0;
            font-weight: bold;
            background: #3b9eff;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, "#3b9eff")}; //amount of darken and color (color to be darken)
            }
        }

        a {
            color: #fff;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }
`;
