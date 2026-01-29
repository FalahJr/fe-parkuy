import React, { useEffect, useState } from "react"
import Button from "../Button/Button";
import './Table.css';

// import { FaLayerGroup} from "react-icons/fa";


// interface TableProps {

// 	tHeading: string[];
// 	tBody: any[];
// 	status?: boolean;
// 	actionColumn?: boolean;
// 	action1?: { name?: string, color?: string, size?: string, type?: string}
// }

// const Table: React.FC<TableProps> =  props =>  {
//     const { tBody, tHeading ,status } = props

// tHeading,
// tBody,
// status,
// actionColumn,
// action1 = {
// 	name : "...",
// 	color: "detail",
// 	size: "medium",
// 	type: "normal"
// }
// }) => {
export interface TableColumn<T = any> {
	title: any
	key: string
	dataType?: "numbering"
	render?: (data: T, index: number) => void
}

interface TableProps {
	data: any[]
	columns: TableColumn[]
}

const Table: React.FC<TableProps> = props => {
	const { data, columns } = props

	const [perPage, setPerpage] = useState<number>(10)
	const [localData, setLocalData] = useState<any[][]>()
	const [selectedPage, setSelectedPage] = useState<number>(0)

	const initTable = () => {
		console.log('initTable data', data)
		const initData = [...data]
		const results = []
		const chunk_size = perPage
		while (initData.length > 0) {
			results.push(initData.splice(0, chunk_size))
		}
		console.log('results', results)
		console.log('results[0]', results[0])
		setLocalData(results)
	}

	// componentDidUpdate
	useEffect(() => {
		initTable()
	}, [data, perPage])
	return (
		<>
			<table className="table-data">
				<thead>
					<tr>
						{columns.map((column, index) => {
							return <th key={index} >{column.title}</th>
						})}
						{/* {status ? <th>Status</th> : null} */}
					</tr>
				</thead>
				<tbody>
					{localData && localData[selectedPage] ? localData[selectedPage].map((d, index) => {
						return (
							<tr key={index}>
								{columns.map((c, indexColumn) => {
									let toShown = d[c.key]
									if (c.render) toShown = c.render(d, index)
									if (c.dataType === "numbering") {
										toShown = selectedPage * perPage + index + 1
									}
									return (
										<td key={indexColumn}>
											{toShown}
										</td>
									)
								})}
							</tr>
						)
					}) : null}
				</tbody>
			</table>
			<div className="pagination-container">
				<div className="pagination-button">
				{selectedPage >= 1 ? <button onClick={() => setSelectedPage(state => state - 1)}>&laquo;</button> : null}
					{/* <a href="#"></a> */}
					{localData ? Array(localData.length).fill(0).map((d, index) => (
                            <button onClick={() => setSelectedPage(index)} className={ selectedPage === index ? "active" : undefined }>{index + 1}
                            </button>
                        )) : null}
					{localData && localData[selectedPage] && selectedPage !== localData.length - 1 ? (
                            <button onClick={() => setSelectedPage(state => state + 1)}>&raquo;</button>
                        ) : null}
				</div>
			</div>

		</>

	);
};

export default Table;
