import { useEffect, useState, useRef } from "react";
import { useFetch } from "../../lib/fetch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface IPropsSelectSubjects {
    selectSubjects: (_: string[]) => void;
    selectedSubjects: string[];
}

const SelectSubjects = ({
    selectSubjects,
    selectedSubjects,
}: IPropsSelectSubjects) => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const { data, refresh } = useFetch("/api/get/subjects");
    const refreshed = useRef(false);

    useEffect(() => {
        if (refreshed.current) {
            refresh();
            refreshed.current = true;
        }
    });

    useEffect(() => {
        if (data?.subjects) {
            setSubjects(data.subjects);
        }
    }, [data]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        selectSubjects(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <>
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                        multiple
                        value={selectedSubjects}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                    >
                        {subjects.map((subject) => (
                            <MenuItem key={subject.name} value={subject.name}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <style jsx>{`
                .select-subject-item {
                    cursor: pointer;
                    border-radius: 8px;
                    width: 100%;
                    padding: 8px;
                }

                .selected {
                    box-shadow: inset 5px 5px 5px #d6d6d6,
                        inset -5px -5px 5px #ffffff;
                }

                .container{
                    height: 50vh;
                    overflow-y: scroll;
                }

                .space {
                    height: 2rem;
                }
            `}</style>
        </>
    );
};

export default SelectSubjects;
