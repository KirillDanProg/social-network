import React, {ChangeEvent, FC, useEffect, useState} from "react"

type EditableSpanType = {
    value: string | null
    callback?: (value: string) => void
}
export const EditableSpan: FC<EditableSpanType>= (props: any) => {
    const [value, setValue] = useState(props.value)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEditMode(false)
        if (value.trim()) {
            props.callback(value)
        }
    }
    const onEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            props.callback(value)
            setEditMode(false)
        }
    }

    return (
        <div>
            {!editMode ?
                <span onDoubleClick={() => setEditMode(true)}>{props.value ? props.value : "Fake Status"}</span>
                :
                <input
                    autoFocus={true}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    onKeyDown={onEnterHandler}
                />
            }
        </div>
    );
};
