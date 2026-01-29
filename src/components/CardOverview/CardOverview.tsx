import React from 'react';
import './CardOverview.css';
import { FaLayerGroup} from "react-icons/fa";


interface CardOverviewProps {
	titleCountOne?: React.ReactNode;
	titleCountTwo?: React.ReactNode;
	titleCountThree?: React.ReactNode;
	titleCountFour?: React.ReactNode;
	countOne?: React.ReactNode;
	countTwo?: React.ReactNode;
	countThree?: React.ReactNode;
	countFour?: React.ReactNode;
    textDate?: string;
	color?: string;
	// size?: string;
	// type?: string;
	icon?: {};
    titleLabel?: string;
	// iconSize?: number;
	style?: {};
	onClick?: () => void;
}

const CardOverview: React.FC<CardOverviewProps> = ({
	titleCountOne = '',
    titleCountTwo = '',
	titleCountThree = '',
	titleCountFour = '',
    countOne = '',
    countTwo = '',
    countThree = '',
    countFour = '',
    textDate = '1 Januari 2022',
    color = '',
    icon = {},
    titleLabel = '',
	style = {},
	onClick,
}) => {
	return (
            <div className={`box ${color}`}>
                <div className="card">
                    <div className="right-side">
                    <div className="box-topic">
                        <i>{icon} </i>
                        {titleLabel}
                    </div>
                    {/* {titleCountThree !== ''&& countThree !== '' && titleCountFour !== '' && countFour !== '' ? ( */}
                           <> 
                    <div className="number">
                        <div className="count">
                        <span className="title-count">{titleCountOne}</span>
                        <span className="number-count">{countOne}</span>
                        </div>
                        </div>
                        </>
                        {/* ) : (
                            <> */}
                    {/* <div className="number" style={style}>

                            <div className="count">
                        <span className="title-count">{titleCountOne}</span>
                        <span className="number-count">{countOne}</span>
                        </div>
                        <div className="count">
                        <span className="title-count">{titleCountTwo}</span>
                        <span className="number-count">{countTwo}</span>
                        </div>
                        </div> */}
{/*                             
                            </>
                        )} */}
                        
                    
                    </div>
                    {/* <center /> */}
                    <div className="indicator">
                    <hr />
                    <span className="text">
                        Data Mulai {textDate}</span>
                    </div>
                {/* </center> */}
                </div>
            </div>
	);
};

export default CardOverview;
