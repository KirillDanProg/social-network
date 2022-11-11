import React, {ComponentType} from 'react';
import { useParams} from "react-router-dom";


export function withRouter<T>(Component: ComponentType<T>) {
    function ComponentWithRouterProp(props: any) {
        let params = useParams();
        return (
            <Component
                {...props}
                router={{params}}
            />
        );
    }

    return ComponentWithRouterProp;
}
