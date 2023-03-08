import {FC} from "react"
import styled from "styled-components";

export const DEFAULT_LABEL = "Please select";

export interface Option {
    value: string;
    label: string;
}

export interface SelectProps {
    label: string;
    options: Option[];
    selected: (value: string) => void;
    defaultLabel?: string;
}

export const Select: FC<SelectProps> = ({label, options, selected, defaultLabel = DEFAULT_LABEL}) => {
    return <SelectWrapper>
        <SelectLabel>{label}</SelectLabel>
        <SelectElement onChange={(e) => selected(e.target.value)}>
            <SelectOption value="">{defaultLabel}</SelectOption>
            {options && options.map(({value, label}) => (
                <SelectOption value={value} key={value}>{label}</SelectOption>
            ))}
        </SelectElement>
    </SelectWrapper>
}

const SelectLabel = styled.label``;

const SelectWrapper = styled.div``;

const SelectElement = styled.select``;

const SelectOption = styled.option``;