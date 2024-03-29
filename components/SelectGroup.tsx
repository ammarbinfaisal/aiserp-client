import { useState } from "react";
import { useFetch } from "../lib/fetch";
import { Input } from "./ui";

const SelectGroup = ({ setGroup }: { setGroup: (_: string) => void }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const {
        data: { groups },
    } = useFetch("/api/get/groups");

    const select = (group: string) => {
        setSelectedGroup(group);
        setGroup(group);
    };

    const selectGen = (group: string) => () => select(group);

    return (
        <>
            <div>
                <h3 className="text-2xl my-4">Select Group</h3>
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    label="group"
                />
                <hr />
                <div className="space"></div>
                <div className="container max-h-screen bg-beige/95">
                    {groups &&
                        groups
                            .filter((group: any) => {
                                return group.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            })
                            .map((group: any) => {
                                return (
                                    <div
                                        key={group.id}
                                        onClick={selectGen(group.id)}
                                        className={`select-group-item ${
                                            selectedGroup === group.id
                                                ? "selected"
                                                : ""
                                        }`}
                                    >
                                        <h4>{group.name}</h4>
                                        <p>{group.email}</p>
                                    </div>
                                );
                            })}
                </div>
            </div>
            <style jsx>{`
                .select-group-item {
                    width: 100%;
                    cursor: pointer;
                    border-radius: 8px;
                    padding: 8px 16px;
                }

                .selected {
                    box-shadow: inset 5px 5px 5px #d6d6d6,
                        inset -5px -5px 5px #ffffff;
                }

                .space {
                    height: 2rem;
                }
            `}</style>
        </>
    );
};

export default SelectGroup;
