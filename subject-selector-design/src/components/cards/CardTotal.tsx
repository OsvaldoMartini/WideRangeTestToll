import React, { FC } from 'react'

export interface CardTotalProps {
    children?: string | React.ReactElement;
    totFilterProp: Number;
    sumProp: Number;
}

export const CardTotal: FC<CardTotalProps> = ({
    totFilterProp,
    sumProp,
}: CardTotalProps) => {
    return <div style={{ position: "absolute", left: `${sumProp}px`, top: "194px" }} >
        <div className="card-total-search">
            <div className="card-total-search-text">
                {totFilterProp}
            </div>
        </div>
    </div>
}