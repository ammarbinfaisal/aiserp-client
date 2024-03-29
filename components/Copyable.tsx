import { useRef, useState } from "react";
import { useAppDispatch } from "../lib/redux/hooks";
import { msgSlice, MsgType } from "../lib/redux/reducers/message";

const Copyable = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const setInfo = (message: string) => {
        dispatch(
            msgSlice.actions.message({
                msg: {
                    type: MsgType.INFO,
                    message,
                },
            })
        );
    };

    const copy = () => {
        const text = ref.current?.textContent;
        if (text) {
            navigator.clipboard.writeText(text);
        }
        onCopy();
    };

    const onCopy = () => {
        setInfo("copied to clipboard");
    };

    return (
        <>
            <span className="m-0 p-0" ref={ref} onClick={copy}>
                {children}
            </span>
        </>
    );
};

export default Copyable;
