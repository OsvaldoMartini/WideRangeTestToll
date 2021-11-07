import React, { Fragment, useContext } from "react";
import { Menu, Header, Segment, Label, Icon } from "semantic-ui-react";
import { Calendar } from "react-widgets";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const MarcaFilters = () => {
	const rootStore = useContext(RootStoreContext);
	const { predicate, setPredicate, marcaCount } = rootStore.marcaStore;

	return (
		<Fragment>
			<Menu vertical size={"large"} style={{ width: "100%", marginTop: 50 }}>
				<Segment.Group>
					<Segment>
						<Icon name="marker" /> Total de Marcas:{" "}
						{<Label size="large">{marcaCount}</Label>}
					</Segment>
				</Segment.Group>
				<Header icon={"filter"} attached color={"teal"} content={"Filters"} />
				<Menu.Item
					active={predicate.size === 0}
					onClick={() => setPredicate("all", "true")}
					color={"blue"}
					name={"all"}
					content={"All Marcas"}
				/>
				<Menu.Item
					active={predicate.has("isGoing")}
					onClick={() => setPredicate("isGoing", "true")}
					color={"blue"}
					name={"username"}
					content={"I'm Going"}
				/>
				<Menu.Item
					active={predicate.has("isHost")}
					onClick={() => setPredicate("isHost", "true")}
					color={"blue"}
					name={"host"}
					content={"Eu inseri"}
				/>
			</Menu>
			<Header
				icon={"calendar"}
				attached
				color={"teal"}
				content={"Select Date"}
			/>
			<Calendar
				onChange={(date) => setPredicate("startDate", date!)}
				value={predicate.get("startDate") || new Date()}
			/>
		</Fragment>
	);
};

export default observer(MarcaFilters);
