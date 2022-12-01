import {useEffect, useRef} from "react";

export const useChatAutoScroll = (items: any) => {

    const ref: any = useRef()

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView(
                {
                    behavior: 'smooth',
                    block: 'end',
                    inline: 'nearest'
                })
        }
    }, [items])

    return ref
}