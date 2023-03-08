import { FC } from "react";
import styled from "styled-components";

export interface ErrorProps {
    children: string;
}

export const Error: FC<ErrorProps> = ({children}) => {
    return <ErrorWrapper>{children}</ErrorWrapper>
}

const ErrorWrapper = styled.div``;