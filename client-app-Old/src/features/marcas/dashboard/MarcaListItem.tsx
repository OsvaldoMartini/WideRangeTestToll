import React, { useContext, useState } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Item, Button, Segment, Icon, Label, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IMarca } from "../../../app/models/marca";
import { format, differenceInDays } from "date-fns";

const MarcaListItem: React.FC<{ marca: IMarca }> = ({ marca }) => {
	const rootStore = useContext(RootStoreContext);
	const { deleteMarca, loading } = rootStore.marcaStore;

	const [deleteTarget, setDeleteTarget] = useState<string | undefined>(
		undefined
	);

	const host = marca.attendees.filter((x) => x.isHost)[0];

	return (
		<Segment.Group>
			<Segment>
				<Item.Group>
					<Item>
						<Item.Image
							size="tiny"
							circular
							src={host.image || "/assets/user.png"}
							style={{ marginBottom: 3 }}
						/>
						<Item.Content>
							<Item.Header as={Link} to={`/marcas/${marca.id}`}>
								{marca.title}
							</Item.Header>
							<Item.Description>
								Inserido por:
								<Link to={`/profile/${host.username}`}>
									{" "}
									{host.displayName}
								</Link>
							</Item.Description>
							{marca.isHost && (
								<Item.Description>
									<Label
										basic
										color="orange"
										content="Voce Inseriu esta Marca"
									/>
								</Item.Description>
							)}
							{marca.isGoing && !marca.isHost && (
								<Item.Description>
									<Label
										basic
										color="green"
										content="You are going to this marca"
									/>
								</Item.Description>
							)}
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
			<Segment>
				<Icon name="registered" /> Processo N.:{" "}
				{<Label size="large">{marca.processoNumber}</Label>}
			</Segment>
			<Segment>
				<Icon name="marker" /> Nome de Fantasia:{" "}
				{<Label size="large">{marca.title}</Label>}
			</Segment>
			<Segment>
				<Icon name="marker" /> Marca:{" "}
				{<Label size="large">{marca.description}</Label>}
			</Segment>
      <Segment>
				<Icon name="marker" /> Procurador:{" "}
				{<Label size="large">{marca.procurador}</Label>}
			</Segment>
		  <Segment>
				<Icon name="marker" /> Proprietario:{" "}
				{<Label size="large">{marca.proprietario}</Label>}
			</Segment>
			<Segment>
				<Grid columns={2}>
					<Grid.Column>
						<Icon name="calendar" /> Data ({marca.category}):{" "}
						{
							<Label size="large" color="blue">
								{format(marca.date, "do MMMM  yyyy")}
							</Label>
						}
					</Grid.Column>
					<Grid.Column>
						<Icon name="calendar" /> Vencimento:{" "}
						{
							<Label
								size="large"
								color={
									differenceInDays(
										new Date(marca.expire),
										new Date(marca.date)
									) < 10
										? "red"
										: "teal"
								}
							>
								{format(marca.expire, "do MMMM  yyyy")}
							</Label>
						}
					</Grid.Column>
				</Grid>
			</Segment>
			<Segment></Segment>
			{/* <Segment secondary>
        <MarcaListItemAttendees attendees={marca.attendees} />
      </Segment> */}
			<Segment clearing>
				<Button
					as={Link}
					to={`/marcas/${marca.id}`}
					floated="right"
					content="View"
					color="blue"
				/>
				<Button
					as={Link}
					to={`/manageMarca/${marca.id}`}
					floated="right"
					content="Edit"
					color="orange"
				/>
				<Button
					name={marca.id}
					onClick={(e) => {
						deleteMarca(e, marca.id);
						setDeleteTarget(e.currentTarget.name);
					}}
					// disabled={!marca.isHost}
					loading={loading && deleteTarget === marca.id}
					floated="right"
					content="Delete"
					basic
					negative
					icon="trash"
				/>
			</Segment>
		</Segment.Group>
	);
};

export default MarcaListItem;
